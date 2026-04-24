# PHPantom — Phpactor Test Parity

Track remaining gaps between phpactor's inference test suite
(`phpactor/lib/WorseReflection/Tests/Inference/`) and PHPantom's
fixture tests (`tests/fixtures/`). Each section groups related gaps
and references the specific phpactor `.test` files to port when the
underlying feature is implemented or verified.

When completing an item, port the phpactor test as a `.fixture` file,
verify it passes, and delete the item from this file. If a feature is
not planned, mark the item with *(won't fix)* and a reason.

---

## Already tracked elsewhere

These gaps have dedicated todo items with fixtures already created
(some ignored). No action needed here — they are listed for
completeness so we don't duplicate work.

| Gap | Todo ref | Fixture(s) |
|-----|----------|------------|
| Null coalesce type refinement | [T8](type-inference.md#t8-null-coalesce--type-refinement) | `null_coalesce/non_nullable_lhs.fixture`, `null_coalesce/nullable_lhs.fixture` |
| Dead-code after `never` return | [T9](type-inference.md#t9-dead-code-elimination-after-never-returning-calls) | `type/never_return_type.fixture` |
| Ternary RHS in list destructuring | [T10](type-inference.md#t10-ternary-expression-as-rhs-of-list-destructuring) | `assignment/list_destructuring_conditional.fixture` |
| Nested list destructuring | [T11](type-inference.md#t11-nested-list-destructuring) | `assignment/nested_list_destructuring.fixture` |

---

## 8. Array mutation tracking (remaining scenarios)

Basic `$arr[] = expr` push tracking works (see
`assignment/array_push_object.fixture`,
`assignment/array_push_string.fixture`,
`assignment/array_push_in_foreach.fixture`). These more advanced
scenarios from phpactor are not yet covered:

| Scenario | phpactor ref |
|----------|-------------|
| Conditional array key addition → union of shapes | `assignment/array_2.test` |
| Unknown key assignment → `array<<missing>, T>` | `assignment/unknown_key.test` |

**Effort: Medium** — these require shape-level array tracking
beyond simple push operations. Ignored fixtures created at
`assignment/array_conditional_shape.fixture` and
`assignment/array_unknown_key.fixture`.

---

## 10. Variable-variable (`${$bar}`) resolution

phpactor tests `${$bar}` resolving to the type of the inner
variable's value.

**phpactor ref:** `variable/braced_expression.test`

**Effort: Low-Medium** — niche feature. Ignored fixture created at
`variable/variable_variable.fixture`.

---

## 19. Binary expression type inference

phpactor infers result types for binary expressions. This is low
priority for completion but could improve hover:

| Category | phpactor ref | Example |
|----------|-------------|---------|
| Arithmetic | `binary-expression/arithmetic.test` | `1 + 2` → `3` |
| Concatenation | `binary-expression/concat.test` | `'a' . 'b'` → `"ab"` |
| Comparison | `binary-expression/compare.scalar.test` | `1 === 1` → `true` |
| Logical | `binary-expression/logical.test` | `true && false` → `false` |
| Bitwise | `binary-expression/bitwise.test` | `1 & 2` → `0` |
| Array union | `binary-expression/array-union.test` | `$a + $b` → combined shape |
| instanceof expr | `binary-expression/type.test` | `$x instanceof Foo` → `bool` |

**Effort: High** — these are all new. Low impact on completion.
Not a priority unless hover accuracy matters.

---

## 20. Postfix increment/decrement

`$i++` on a literal `0` → `1`, `$i--` on literal `2` → `1`.

**phpactor ref:** `postfix-update/increment.test`,
`postfix-update/decrement.test`

**Effort: Low** — niche. Only relevant for literal type tracking.

---

## 21. Return statement type inference

phpactor tests return type inference from method bodies:

| Scenario | phpactor ref |
|----------|-------------|
| Single literal return | `return-statement/class_method.test` |
| Missing return type → `<missing>` | `return-statement/missing_return_type.test` |
| Multiple returns → union | `return-statement/multiple_return.test` |
| No return → `void` | `return-statement/no_return.test` |

**Effort: Medium** — body return type inference is a separate
feature from our current declared-type-based resolution. Requires
walking the function body AST, resolving each return expression's
type, and unioning the results. Ignored fixture created at
`type/return_type_from_body.fixture`.

---

## 22. `global` keyword

Variables imported with `global $var` inside functions should be
accessible with their original type.

**phpactor ref:** `global/global_keyword.test`

**Effort: Low-Medium** — the `global` declaration is tracked for
definition lookup but the type of the outer-scope variable is not
propagated. Ignored fixture created at
`variable/global_keyword.fixture`.

---

## Summary by effort

### Low-Medium effort (need minor code changes)

| # | Item | phpactor ref |
|---|------|-------------|
| 10 | Variable-variable `${$bar}` | `variable/braced_expression.test` |
| 22 | `global` keyword type propagation | `global/global_keyword.test` |

### Medium effort (new features needed)

| # | Item | phpactor ref |
|---|------|-------------|
| 8 | Array mutation tracking (conditional/unknown key) | `assignment/array_2.test`, `assignment/unknown_key.test` |
| 21 | Return statement type inference | `return-statement/*.test` |

### High effort / low priority

| # | Item | phpactor ref |
|---|------|-------------|
| 19 | Binary expression types | `binary-expression/*.test` |
| 20 | Postfix increment/decrement | `postfix-update/*.test` |