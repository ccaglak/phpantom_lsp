//! Array shape and object shape parsing.
//!
//! This submodule handles parsing PHPStan/Psalm array shape and object
//! shape type strings into their constituent entries, and looking up
//! value types by key.
//!
//! All parsing is delegated to `PhpType::parse()` (which uses
//! `mago_type_syntax` internally), eliminating ~250 lines of
//! hand-rolled depth-tracking parsers.
//!
//! Each public function has a `_typed` variant that accepts `&PhpType`
//! directly (avoiding a redundant re-parse when the caller already has
//! a parsed type), and a `&str` convenience wrapper that delegates to it.

use crate::php_type::PhpType;

/// Resolve implicit positional keys in shape entries.
///
/// Entries with `key: None` are assigned auto-incrementing string
/// indices (`"0"`, `"1"`, …), matching PHPStan's array shape semantics.
fn resolve_shape_keys(entries: &[crate::php_type::ShapeEntry]) -> Vec<crate::php_type::ShapeEntry> {
    let mut result = Vec::with_capacity(entries.len());
    let mut implicit_index: u32 = 0;

    for entry in entries {
        let key = match &entry.key {
            Some(k) => Some(k.clone()),
            None => {
                let k = implicit_index.to_string();
                implicit_index += 1;
                Some(k)
            }
        };

        result.push(crate::php_type::ShapeEntry {
            key,
            value_type: entry.value_type.clone(),
            optional: entry.optional,
        });
    }

    result
}

/// Unwrap nullable and extract an array shape from a `PhpType`.
///
/// Returns the shape entries if the (possibly nullable) type is an
/// array shape, or `None` otherwise.
fn unwrap_array_shape(ty: &PhpType) -> Option<&[crate::php_type::ShapeEntry]> {
    match ty {
        PhpType::ArrayShape(entries) => Some(entries),
        PhpType::Nullable(inner) => unwrap_array_shape(inner),
        _ => None,
    }
}

/// Unwrap nullable/intersection and extract an object shape from a `PhpType`.
///
/// Returns the shape entries if the (possibly nullable or intersected)
/// type contains an object shape, or `None` otherwise.
fn unwrap_object_shape(ty: &PhpType) -> Option<&[crate::php_type::ShapeEntry]> {
    match ty {
        PhpType::ObjectShape(entries) => Some(entries),
        PhpType::Nullable(inner) => unwrap_object_shape(inner),
        // `object{foo: int, bar: string}&\stdClass` parses as an
        // intersection; check each member.
        PhpType::Intersection(members) => members.iter().find_map(|m| unwrap_object_shape(m)),
        _ => None,
    }
}

// ─── Array shape ────────────────────────────────────────────────────────────

/// Parse a pre-parsed `PhpType` as an array shape, returning its entries.
///
/// This is the `_typed` variant of [`parse_array_shape`] for callers
/// that already hold a `PhpType` and want to avoid a redundant re-parse.
///
/// Handles both named and positional (implicit-key) entries, optional
/// keys (with `?` suffix), and nested types.
///
/// Returns `None` if the type is not an array shape.
pub fn parse_array_shape_typed(ty: &PhpType) -> Option<Vec<crate::php_type::ShapeEntry>> {
    let entries = unwrap_array_shape(ty)?;
    Some(resolve_shape_keys(entries))
}

/// Parse a PHPStan/Psalm array shape type string into its constituent
/// entries.
///
/// Handles both named and positional (implicit-key) entries, optional
/// keys (with `?` suffix), and nested types.
///
/// # Examples
///
/// - `"array{name: string, age: int}"` → two entries
/// - `"array{name: string, age?: int}"` → "age" is optional
/// - `"array{string, int}"` → positional keys "0", "1"
/// - `"array{user: User, items: list<Item>}"` → nested generics preserved
///
/// Returns `None` if the type is not an array shape.
pub fn parse_array_shape(type_str: &str) -> Option<Vec<crate::php_type::ShapeEntry>> {
    parse_array_shape_typed(&PhpType::parse(type_str))
}

/// Look up the value type for a specific key in an already-parsed array
/// shape `PhpType`.
///
/// This is the `_typed` variant of [`extract_array_shape_value_type`]
/// for callers that already hold a `PhpType`.
///
/// Returns `None` if the type is not an array shape or the key is not found.
pub fn extract_array_shape_value_type_typed(ty: &PhpType, key: &str) -> Option<PhpType> {
    let entries = parse_array_shape_typed(ty)?;
    entries
        .into_iter()
        .find(|e| e.key.as_deref() == Some(key))
        .map(|e| e.value_type)
}

/// Look up the value type for a specific key in an array shape type string.
///
/// Given a type like `"array{name: string, user: User}"` and key `"user"`,
/// returns `Some(PhpType)` for the `User` type.
///
/// Returns `None` if the type is not an array shape or the key is not found.
pub fn extract_array_shape_value_type(type_str: &str, key: &str) -> Option<PhpType> {
    extract_array_shape_value_type_typed(&PhpType::parse(type_str), key)
}

// ─── Object shape ───────────────────────────────────────────────────────────

/// Parse a pre-parsed `PhpType` as an object shape, returning its entries.
///
/// This is the `_typed` variant of [`parse_object_shape`] for callers
/// that already hold a `PhpType` and want to avoid a redundant re-parse.
///
/// Returns `None` if the type is not an object shape.
pub fn parse_object_shape_typed(ty: &PhpType) -> Option<Vec<crate::php_type::ShapeEntry>> {
    let entries = unwrap_object_shape(ty)?;
    Some(resolve_shape_keys(entries))
}

/// Parse a PHPStan object shape type string into its constituent entries.
///
/// Object shapes describe an anonymous object with typed properties:
///
/// # Examples
///
/// - `"object{foo: int, bar: string}"` → two entries
/// - `"object{foo: int, bar?: string}"` → "bar" is optional
/// - `"object{'foo': int, \"bar\": string}"` → quoted property names
/// - `"object{foo: int, bar: string}&\stdClass"` → intersection ignored here
///
/// Returns `None` if the type is not an object shape.
pub fn parse_object_shape(type_str: &str) -> Option<Vec<crate::php_type::ShapeEntry>> {
    parse_object_shape_typed(&PhpType::parse(type_str))
}

/// Return `true` if the given `PhpType` is an object shape type.
///
/// This is the `_typed` variant of [`is_object_shape`] for callers
/// that already hold a `PhpType`.
pub fn is_object_shape_typed(ty: &PhpType) -> bool {
    ty.is_object_shape()
}

/// Return `true` if `type_str` is an object shape type (e.g. `object{name: string}`).
pub fn is_object_shape(type_str: &str) -> bool {
    is_object_shape_typed(&PhpType::parse(type_str))
}

/// Look up the value type for a specific property in an already-parsed
/// object shape `PhpType`.
///
/// This is the `_typed` variant of [`extract_object_shape_property_type`]
/// for callers that already hold a `PhpType`.
///
/// Returns `None` if the type is not an object shape or the property
/// is not found.
pub fn extract_object_shape_property_type_typed(ty: &PhpType, prop: &str) -> Option<PhpType> {
    let entries = parse_object_shape_typed(ty)?;
    entries
        .into_iter()
        .find(|e| e.key.as_deref() == Some(prop))
        .map(|e| e.value_type)
}

/// Look up the value type for a specific property in an object shape.
///
/// Given a type like `"object{name: string, user: User}"` and key `"user"`,
/// returns `Some(PhpType)` for the `User` type.
///
/// Returns `None` if the type is not an object shape or the property
/// is not found.
pub fn extract_object_shape_property_type(type_str: &str, prop: &str) -> Option<PhpType> {
    extract_object_shape_property_type_typed(&PhpType::parse(type_str), prop)
}
