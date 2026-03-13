//! Workspace Symbols (`workspace/symbol`).
//!
//! Returns a flat list of symbols across the entire workspace so that
//! editors can display a "Go to Symbol in Workspace" picker (typically
//! triggered via Ctrl+T / Cmd+T).
//!
//! The handler builds the list from five data sources:
//!
//! 1. **`ast_map`** — provides `ClassInfo` records for every class,
//!    interface, trait, and enum across all indexed files.
//!
//! 2. **`global_functions`** — provides `FunctionInfo` records keyed by
//!    name with associated file URIs.
//!
//! 3. **`global_defines`** — provides `DefineInfo` records for
//!    `define()` / top-level `const` declarations.
//!
//! 4. **`class_index`** — maps fully-qualified class names to file URIs
//!    for classes discovered during parsing but not necessarily open.
//!    Paired with `fqn_index` for rich metadata when available.
//!
//! 5. **`classmap`** — maps fully-qualified class names to file paths
//!    from Composer's `autoload_classmap.php`, covering vendor classes.

use std::collections::HashSet;

use tower_lsp::lsp_types::*;

use crate::Backend;
use crate::types::{ClassLikeKind, DefineInfo, FunctionInfo};
use crate::util::offset_to_position;

/// Maximum number of symbols returned for a single workspace/symbol request.
///
/// When the query is empty (or very short) the result set can be enormous.
/// We cap it to keep the response snappy and avoid overwhelming the client.
const MAX_RESULTS: usize = 500;

impl Backend {
    /// Handle a `workspace/symbol` request.
    ///
    /// Searches classes, interfaces, traits, enums, standalone functions,
    /// and global constants across all indexed files plus vendor classes
    /// from the Composer classmap and class index.  The `query` string
    /// is matched as a case-insensitive substring against symbol names.
    /// An empty query returns symbols from parsed files only (not the
    /// full classmap/class_index) to avoid flooding the picker.
    #[allow(deprecated)] // SymbolInformation::deprecated is deprecated in the LSP types crate
    pub fn handle_workspace_symbol(&self, query: &str) -> Option<Vec<SymbolInformation>> {
        let query_lower = query.to_lowercase();
        let mut symbols: Vec<SymbolInformation> = Vec::new();

        // Track FQNs already emitted so that class_index and classmap
        // don't produce duplicates for classes already in the ast_map.
        let mut seen_fqns: HashSet<String> = HashSet::new();

        // ── Classes, interfaces, traits, enums (from ast_map) ───────
        {
            let ast_map = self.ast_map.read();
            for (file_uri, classes) in ast_map.iter() {
                for class in classes {
                    // Skip anonymous classes (empty name or name starting with
                    // "anonymous@" which the parser uses for anonymous classes).
                    if class.name.is_empty() || class.name.starts_with("anonymous@") {
                        continue;
                    }

                    let fqn = class.fqn();

                    // Apply query filter.
                    if !query_lower.is_empty() && !fqn.to_lowercase().contains(&query_lower) {
                        continue;
                    }

                    // Skip classes with no usable offset.
                    if class.keyword_offset == 0 {
                        continue;
                    }

                    let content = match self.get_file_content_arc(file_uri) {
                        Some(c) => c,
                        None => continue,
                    };

                    let pos = offset_to_position(&content, class.keyword_offset as usize);
                    let kind = match class.kind {
                        ClassLikeKind::Class => SymbolKind::CLASS,
                        ClassLikeKind::Interface => SymbolKind::INTERFACE,
                        ClassLikeKind::Trait => SymbolKind::CLASS,
                        ClassLikeKind::Enum => SymbolKind::ENUM,
                    };

                    let tags = class
                        .deprecation_message
                        .as_ref()
                        .map(|_| vec![SymbolTag::DEPRECATED]);

                    seen_fqns.insert(fqn.clone());

                    symbols.push(SymbolInformation {
                        name: fqn,
                        kind,
                        tags,
                        deprecated: None,
                        location: Location {
                            uri: Url::parse(file_uri)
                                .unwrap_or_else(|_| Url::parse("file:///unknown").unwrap()),
                            range: Range::new(pos, pos),
                        },
                        container_name: class.file_namespace.clone(),
                    });

                    if symbols.len() >= MAX_RESULTS {
                        return Some(symbols);
                    }
                }
            }
        }

        // ── Standalone functions ────────────────────────────────────
        {
            let fmap = self.global_functions.read();
            for (_name, (file_uri, func)) in fmap.iter() {
                let display_name = function_display_name(func);

                // Apply query filter.
                if !query_lower.is_empty() && !display_name.to_lowercase().contains(&query_lower) {
                    continue;
                }

                // Skip functions with no usable offset.
                if func.name_offset == 0 {
                    continue;
                }

                let content = match self.get_file_content_arc(file_uri) {
                    Some(c) => c,
                    None => continue,
                };

                let pos = offset_to_position(&content, func.name_offset as usize);

                let tags = func
                    .deprecation_message
                    .as_ref()
                    .map(|_| vec![SymbolTag::DEPRECATED]);

                symbols.push(SymbolInformation {
                    name: display_name,
                    kind: SymbolKind::FUNCTION,
                    tags,
                    deprecated: None,
                    location: Location {
                        uri: Url::parse(file_uri)
                            .unwrap_or_else(|_| Url::parse("file:///unknown").unwrap()),
                        range: Range::new(pos, pos),
                    },
                    container_name: func.namespace.clone(),
                });

                if symbols.len() >= MAX_RESULTS {
                    return Some(symbols);
                }
            }
        }

        // ── Global defines / constants ──────────────────────────────
        {
            let dmap = self.global_defines.read();
            for (name, info) in dmap.iter() {
                // Apply query filter.
                if !query_lower.is_empty() && !name.to_lowercase().contains(&query_lower) {
                    continue;
                }

                // Skip constants with no usable offset.
                if info.name_offset == 0 {
                    continue;
                }

                let content = match self.get_file_content_arc(&info.file_uri) {
                    Some(c) => c,
                    None => continue,
                };

                let pos = offset_to_position(&content, info.name_offset as usize);

                symbols.push(make_constant_symbol(name, info, pos));

                if symbols.len() >= MAX_RESULTS {
                    return Some(symbols);
                }
            }
        }

        // ── class_index (discovered classes not yet in ast_map) ─────
        // Only searched when the user has typed a query — an empty query
        // would dump thousands of vendor classes into the picker.
        if !query_lower.is_empty() {
            // Grab the fqn_index for rich metadata (kind, deprecation).
            let fqn_idx = self.fqn_index.read();
            let idx = self.class_index.read();
            for (fqn, file_uri) in idx.iter() {
                if seen_fqns.contains(fqn) {
                    continue;
                }

                if !fqn.to_lowercase().contains(&query_lower) {
                    continue;
                }

                let (kind, tags, container_name) =
                    if let Some(class_info) = fqn_idx.get(fqn.as_str()) {
                        let k = match class_info.kind {
                            ClassLikeKind::Class => SymbolKind::CLASS,
                            ClassLikeKind::Interface => SymbolKind::INTERFACE,
                            ClassLikeKind::Trait => SymbolKind::CLASS,
                            ClassLikeKind::Enum => SymbolKind::ENUM,
                        };
                        let t = class_info
                            .deprecation_message
                            .as_ref()
                            .map(|_| vec![SymbolTag::DEPRECATED]);
                        (k, t, class_info.file_namespace.clone())
                    } else {
                        (SymbolKind::CLASS, None, namespace_from_fqn(fqn))
                    };

                // Try to compute a precise position from file content.
                let pos = if let Some(class_info) = fqn_idx.get(fqn.as_str()) {
                    if class_info.keyword_offset > 0 {
                        if let Some(content) = self.get_file_content_arc(file_uri) {
                            offset_to_position(&content, class_info.keyword_offset as usize)
                        } else {
                            Position::new(0, 0)
                        }
                    } else {
                        Position::new(0, 0)
                    }
                } else {
                    Position::new(0, 0)
                };

                seen_fqns.insert(fqn.clone());

                symbols.push(SymbolInformation {
                    name: fqn.clone(),
                    kind,
                    tags,
                    deprecated: None,
                    location: Location {
                        uri: Url::parse(file_uri)
                            .unwrap_or_else(|_| Url::parse("file:///unknown").unwrap()),
                        range: Range::new(pos, pos),
                    },
                    container_name,
                });

                if symbols.len() >= MAX_RESULTS {
                    return Some(symbols);
                }
            }
        }

        // ── classmap (Composer vendor classes) ──────────────────────
        // Only searched when the user has typed a query, same rationale
        // as above.
        if !query_lower.is_empty() {
            let cmap = self.classmap.read();
            for (fqn, file_path) in cmap.iter() {
                if seen_fqns.contains(fqn) {
                    continue;
                }

                if !fqn.to_lowercase().contains(&query_lower) {
                    continue;
                }

                let uri = match Url::from_file_path(file_path) {
                    Ok(u) => u,
                    Err(()) => continue,
                };

                seen_fqns.insert(fqn.clone());

                symbols.push(SymbolInformation {
                    name: fqn.clone(),
                    kind: SymbolKind::CLASS,
                    tags: None,
                    deprecated: None,
                    location: Location {
                        uri,
                        range: Range::new(Position::new(0, 0), Position::new(0, 0)),
                    },
                    container_name: namespace_from_fqn(fqn),
                });

                if symbols.len() >= MAX_RESULTS {
                    return Some(symbols);
                }
            }
        }

        if symbols.is_empty() {
            None
        } else {
            Some(symbols)
        }
    }
}

/// Build the display name for a function, including its namespace prefix
/// when present (e.g. `"Amp\\delay"`).
fn function_display_name(func: &FunctionInfo) -> String {
    match &func.namespace {
        Some(ns) if !ns.is_empty() => format!("{}\\{}", ns, func.name),
        _ => func.name.clone(),
    }
}

/// Extract the namespace portion from a fully-qualified class name.
///
/// Returns `Some("App\\Models")` for `"App\\Models\\User"`, or `None`
/// for a class with no namespace (e.g. `"stdClass"`).
fn namespace_from_fqn(fqn: &str) -> Option<String> {
    fqn.rfind('\\').map(|i| fqn[..i].to_string())
}

/// Build a `SymbolInformation` for a global constant.
#[allow(deprecated)] // SymbolInformation::deprecated is deprecated in the LSP types crate
fn make_constant_symbol(name: &str, info: &DefineInfo, pos: Position) -> SymbolInformation {
    SymbolInformation {
        name: name.to_string(),
        kind: SymbolKind::CONSTANT,
        tags: None,
        deprecated: None,
        location: Location {
            uri: Url::parse(&info.file_uri)
                .unwrap_or_else(|_| Url::parse("file:///unknown").unwrap()),
            range: Range::new(pos, pos),
        },
        container_name: None,
    }
}
