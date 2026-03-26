//! Change Visibility code action.
//!
//! When the cursor is on a method, property, constant, or promoted
//! constructor parameter that has an explicit visibility modifier, this
//! code action offers to change it to each of the other two visibility
//! levels.  For example, a `public` method gets "Make protected" and
//! "Make private" actions.
//!
//! **Code action kind:** `refactor.rewrite`.
//!
//! This is a single-file edit — it does not update call sites or
//! subclass overrides in other files.

use bumpalo::Bump;
use mago_syntax::ast::modifier::Modifier;
use tower_lsp::lsp_types::*;

use super::cursor_context::{CursorContext, MemberContext, find_cursor_context};
use crate::Backend;
use crate::util::offset_to_position;

/// A visibility modifier found in the AST together with its byte span.
struct VisibilityHit {
    /// The current visibility keyword text (e.g. "public").
    current: &'static str,
    /// Byte offset of the start of the visibility keyword.
    start: u32,
    /// Byte offset of the end of the visibility keyword.
    end: u32,
}

impl Backend {
    /// Collect "Change visibility" code actions for the member under the
    /// cursor.
    pub(crate) fn collect_change_visibility_actions(
        &self,
        uri: &str,
        content: &str,
        params: &CodeActionParams,
        out: &mut Vec<CodeActionOrCommand>,
    ) {
        let doc_uri: Url = match uri.parse() {
            Ok(u) => u,
            Err(_) => return,
        };

        let cursor_offset = crate::util::position_to_offset(content, params.range.start);

        let arena = Bump::new();
        let file_id = mago_database::file::FileId::new("input.php");
        let program = mago_syntax::parser::parse_file_content(&arena, file_id, content);

        let ctx = find_cursor_context(&program.statements, cursor_offset);

        let hit = match find_visibility_from_context(&ctx, cursor_offset) {
            Some(h) => h,
            None => return,
        };

        let alternatives: &[(&str, &str)] = match hit.current {
            "public" => &[("protected", "Make protected"), ("private", "Make private")],
            "protected" => &[("public", "Make public"), ("private", "Make private")],
            "private" => &[("public", "Make public"), ("protected", "Make protected")],
            _ => return,
        };

        let start_pos = offset_to_position(content, hit.start as usize);
        let end_pos = offset_to_position(content, hit.end as usize);

        for &(new_keyword, title) in alternatives {
            let mut changes = std::collections::HashMap::new();
            changes.insert(
                doc_uri.clone(),
                vec![TextEdit {
                    range: Range {
                        start: start_pos,
                        end: end_pos,
                    },
                    new_text: new_keyword.to_string(),
                }],
            );

            out.push(CodeActionOrCommand::CodeAction(CodeAction {
                title: title.to_string(),
                kind: Some(CodeActionKind::new("refactor.rewrite")),
                diagnostics: None,
                edit: Some(WorkspaceEdit {
                    changes: Some(changes),
                    document_changes: None,
                    change_annotations: None,
                }),
                command: None,
                is_preferred: None,
                disabled: None,
                data: None,
            }));
        }
    }
}

// ── Visibility extraction from CursorContext ────────────────────────────────

/// Given a `CursorContext`, find the visibility modifier that applies
/// at the cursor position.
fn find_visibility_from_context(ctx: &CursorContext<'_>, cursor: u32) -> Option<VisibilityHit> {
    match ctx {
        CursorContext::InClassLike { member, .. } => match member {
            MemberContext::Method(method, in_body) => {
                if *in_body {
                    // Cursor is inside the body — only check promoted
                    // constructor parameters, not the method-level visibility.
                    find_promoted_param_visibility(method, cursor)
                } else {
                    // Check promoted constructor parameters first.
                    if let Some(hit) = find_promoted_param_visibility(method, cursor) {
                        return Some(hit);
                    }
                    // Then check method-level visibility.
                    find_visibility_in_modifiers(method.modifiers.iter())
                }
            }
            MemberContext::Property(property) => {
                find_visibility_in_modifiers(property.modifiers().iter())
            }
            MemberContext::Constant(constant) => {
                find_visibility_in_modifiers(constant.modifiers.iter())
            }
            MemberContext::TraitUse | MemberContext::EnumCase | MemberContext::None => None,
        },
        CursorContext::InFunction(_, _) | CursorContext::None => None,
    }
}

/// For constructor methods, check if the cursor is on a promoted
/// parameter with a visibility modifier.
fn find_promoted_param_visibility(
    method: &mago_syntax::ast::class_like::method::Method<'_>,
    cursor: u32,
) -> Option<VisibilityHit> {
    use mago_span::HasSpan;

    // Only check constructors — only they can have promoted properties.
    if method.name.value != "__construct" {
        return None;
    }

    for param in method.parameter_list.parameters.iter() {
        if !param.is_promoted_property() {
            continue;
        }
        let param_span = param.span();
        if cursor < param_span.start.offset || cursor > param_span.end.offset {
            continue;
        }
        if let Some(hit) = find_visibility_in_modifiers(param.modifiers.iter()) {
            return Some(hit);
        }
    }
    None
}

/// Find the first read-visibility modifier (`public`, `protected`, or
/// `private`) in a sequence of modifiers and return a `VisibilityHit`.
fn find_visibility_in_modifiers<'a>(
    modifiers: impl Iterator<Item = &'a Modifier<'a>>,
) -> Option<VisibilityHit> {
    for m in modifiers {
        let (keyword_str, span) = match m {
            Modifier::Public(kw) => ("public", kw.span),
            Modifier::Protected(kw) => ("protected", kw.span),
            Modifier::Private(kw) => ("private", kw.span),
            _ => continue,
        };
        return Some(VisibilityHit {
            current: keyword_str,
            start: span.start.offset,
            end: span.end.offset,
        });
    }
    None
}

// ── Tests ───────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    /// Helper: parse PHP and find visibility at a given byte offset.
    fn find_vis(php: &str, offset: u32) -> Option<VisibilityHit> {
        let arena = Bump::new();
        let file_id = mago_database::file::FileId::new("input.php");
        let program = mago_syntax::parser::parse_file_content(&arena, file_id, php);
        let ctx = find_cursor_context(&program.statements, offset);
        find_visibility_from_context(&ctx, offset)
    }

    #[test]
    fn finds_public_method() {
        let php = "<?php\nclass Foo {\n    public function bar() {}\n}";
        let pos = php.find("public function").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "public");
    }

    #[test]
    fn no_visibility_inside_method_body() {
        let php = "<?php\nclass Foo {\n    public function bar() {\n        $x = 1;\n    }\n}";
        // Place cursor on `$x = 1;` inside the method body.
        let pos = php.find("$x = 1").unwrap() as u32;
        let hit = find_vis(php, pos);
        assert!(
            hit.is_none(),
            "should not offer visibility change inside method body"
        );
    }

    #[test]
    fn no_visibility_on_method_opening_brace() {
        let php = "<?php\nclass Foo {\n    public function bar() {\n        $x = 1;\n    }\n}";
        // Place cursor on the opening brace of the method body.
        let pos = php.find("{\n        $x").unwrap() as u32;
        let hit = find_vis(php, pos);
        assert!(
            hit.is_none(),
            "should not offer visibility change on method body brace"
        );
    }

    #[test]
    fn finds_visibility_on_method_name() {
        let php = "<?php\nclass Foo {\n    public function bar() {\n        $x = 1;\n    }\n}";
        let pos = php.find("bar").unwrap() as u32;
        let hit = find_vis(php, pos).unwrap();
        assert_eq!(hit.current, "public");
    }

    #[test]
    fn finds_visibility_on_method_return_type() {
        let php =
            "<?php\nclass Foo {\n    public function bar(): void {\n        $x = 1;\n    }\n}";
        let pos = php.find("void").unwrap() as u32;
        let hit = find_vis(php, pos).unwrap();
        assert_eq!(hit.current, "public");
    }

    #[test]
    fn finds_protected_property() {
        let php = "<?php\nclass Foo {\n    protected string $bar;\n}";
        let pos = php.find("protected string").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "protected");
    }

    #[test]
    fn finds_private_constant() {
        let php = "<?php\nclass Foo {\n    private const BAR = 1;\n}";
        let pos = php.find("private const").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "private");
    }

    #[test]
    fn finds_promoted_param_visibility() {
        let php = "<?php\nclass Foo {\n    public function __construct(private string $name) {}\n}";
        let pos = php.find("private string").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "private");
    }

    #[test]
    fn no_visibility_on_trait_use() {
        let php = "<?php\nclass Foo {\n    use SomeTrait;\n}";
        let pos = php.find("use SomeTrait").unwrap() as u32;
        let hit = find_vis(php, pos + 2);
        assert!(hit.is_none());
    }

    #[test]
    fn no_visibility_outside_class() {
        let php = "<?php\nfunction foo() {}";
        let pos = php.find("function foo").unwrap() as u32;
        let hit = find_vis(php, pos + 2);
        assert!(hit.is_none());
    }

    #[test]
    fn finds_visibility_in_interface() {
        let php = "<?php\ninterface Foo {\n    public function bar(): void;\n}";
        let pos = php.find("public function").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "public");
    }

    #[test]
    fn finds_visibility_in_enum() {
        let php = "<?php\nenum Foo {\n    public function bar(): void {}\n}";
        let pos = php.find("public function").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "public");
    }

    #[test]
    fn finds_visibility_in_trait() {
        let php = "<?php\ntrait Foo {\n    protected function bar() {}\n}";
        let pos = php.find("protected function").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "protected");
    }

    #[test]
    fn finds_visibility_in_namespace() {
        let php = "<?php\nnamespace App;\nclass Foo {\n    public function bar() {}\n}";
        let pos = php.find("public function").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "public");
    }

    #[test]
    fn finds_visibility_in_braced_namespace() {
        let php = "<?php\nnamespace App {\nclass Foo {\n    private function bar() {}\n}\n}";
        let pos = php.find("private function").unwrap() as u32;
        let hit = find_vis(php, pos + 2).unwrap();
        assert_eq!(hit.current, "private");
    }
}
