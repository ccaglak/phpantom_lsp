# PHPantom — Bug Fixes

## B1 — `update_docblock` parses `@return` tag text without stripping prefix

**File:** `src/code_actions/update_docblock.rs` line 929

`has_rich_return` calls `PhpType::parse(text)` on a `DocLine::Return`
value, but `DocLine::Return` stores the full tag text including the
`@return ` prefix (e.g. `"@return array<string, int> some description"`).
`PhpType::parse("@return array<string, int>")` cannot parse the type
correctly because `@return` is not a valid type expression, so the
result is always `PhpType::Raw(...)` and `has_type_structure()` always
returns `false`.

This means the body-based enrichment check never detects that an
existing `@return` tag already has type structure, so it may
unnecessarily propose an enriched `@return` replacement even when the
existing tag is already rich.

**Fix:** Replace the re-parse with a check on the already-parsed
`info.doc_return`:

```rust
let has_rich_return = info
    .doc_return
    .as_ref()
    .is_some_and(|dr| dr.type_parsed.has_type_structure());
```

Alternatively, strip the `@return ` prefix before parsing:

```rust
let type_part = text.strip_prefix("@return").unwrap_or(text).trim();
let parsed = PhpType::parse(type_part);
```


