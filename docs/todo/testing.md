# PHPantom — Ignored Fixture Tasks

There are **228 fixture tests** in `tests/fixtures/`. Of these, **214
pass** and **14 are ignored** because they exercise features or bug
fixes that are not yet implemented. Each ignored fixture has a
`// ignore:` comment explaining what is missing.

This document groups the 14 ignored fixtures by the underlying work
needed to un-ignore them. Tasks are ordered by the number of fixtures
they unblock (descending), then by estimated effort. Once a task is
complete, remove the `// ignore:` line from each fixture, verify the
fixture passes, and delete the task from this file.

After completing a task, run the full CI suite:

```
cargo test
cargo clippy -- -D warnings
cargo clippy --tests -- -D warnings
cargo fmt --check
php -l example.php
```

---

## 3. Property-level narrowing (5 fixtures)

**Ref:** [type-inference.md §21](type-inference.md#21-property-level-narrowing)
**Impact: Medium · Effort: Medium**

Only local variables participate in type narrowing today.
`$this->prop instanceof Foo` inside an `if` block does not narrow
`$this->prop` for subsequent member access. The narrowing engine needs
to track member access expressions in addition to bare variables.

**Fixtures:**

- [ ] `narrowing/property_narrowing.fixture` — `if ($this->prop instanceof Foo)` narrows
- [ ] `narrowing/property_narrowing_negated.fixture` — negated property narrowing with early return
- [ ] `combination/property_instanceof.fixture` — property instanceof in combination context
- [ ] `member_access/access_from_union.fixture` — narrowing on `$this->prop` to access members
- [ ] `function/assert_property_instanceof.fixture` — `assert($this->prop instanceof Foo)` narrows

**Implementation notes:**

Extend `NarrowedType` (or the narrowing state structure) to accept a
member access path (`$this->prop`) as a narrowing key in addition to
plain variable names. When emitting narrowing from `instanceof` checks,
detect whether the left side is a property access and store the full
path. During variable resolution, when encountering `$this->prop`,
check the narrowing state for a matching member access path.

---

## 5. Attribute context support (3 fixtures)

**Ref:** [signature-help.md §4](signature-help.md#4-attribute-constructor-signature-help)
**Impact: Medium · Effort: Medium**

PHP 8 attributes take constructor arguments (`#[Route('/path', methods: ['GET'])]`),
but no `CallSite` is emitted for attribute nodes. Signature help and
named parameter completion do not fire inside attribute parentheses.

**Fixtures:**

- [ ] `named_parameter/attribute_constructor.fixture` — named params in `#[Attr(name: <>)]`
- [ ] `signature_help/attribute_constructor.fixture` — sig help inside `#[Attr(<>)]`
- [ ] `signature_help/attribute_second_param.fixture` — sig help active param tracking in `#[Attr('a', <>)]`

**Implementation notes:**

In `symbol_map/extraction.rs`, add a visitor for `Attribute` AST nodes
that emits a `CallSite` pointing at the attribute class's `__construct`
method. The comma offsets and argument positions need to be extracted
the same way as for regular `ObjectCreationExpression` nodes. Once the
`CallSite` exists, signature help and named parameter completion should
work without further changes.

---

## 11. `class-string<T>` on interface method not inherited (1 fixture)

**Ref:** [type-inference.md §25](type-inference.md#25-class-stringt-on-interface-method-not-inherited)
**Impact: Medium · Effort: Medium**

When an interface method uses `class-string<T>` and a class implements
that interface, the generic return type is lost during inheritance
merging.

**Fixture:**

- [ ] `generics/class_string_generic_interface.fixture` — `class-string<T>` on interface method not propagated

---

## 16. Generic `@phpstan-assert` with `class-string<T>` (1 fixture)

**Ref:** [type-inference.md §20](type-inference.md#20-generic-phpstan-assert-with-class-stringt-parameter-inference)
**Impact: Medium · Effort: Medium-High**

`@phpstan-assert T $value` with `@template T` bound via a
`class-string<T>` parameter should infer the narrowed type from the
class-string argument at the call site.

**Fixture:**

- [ ] `narrowing/phpstan_assert_generic.fixture` — `assertInstanceOf(Foo::class, $x)` narrows `$x` to `Foo`

---

## 20. Elseif chain narrowing with `is_*()` (1 fixture)

**Ref:** [type-inference.md §3](type-inference.md#3-parse-and-resolve-param-is-t--a--b-return-types) (related)
**Impact: Medium · Effort: Medium**

Simple `is_string()` narrowing works (tested in the passing
is_string_narrowing fixture), but an `if/elseif/else` chain
with `is_string` in the `if` and `is_int` in the `elseif` does not
strip both types in the `else` branch. This is an elseif-chain
narrowing propagation issue rather than `is_*()` parsing.

**Fixture:**

- [ ] `function/is_type_elseif_chain.fixture` — elseif chain strips `string` and `int`, leaving `Foobar` in else

---

## 24. Variable scope isolation in closures (1 fixture)

**Impact: Low · Effort: Low-Medium**

Variables declared outside a closure are visible inside the closure body
even without a `use()` clause. PHP closures have strict scope isolation:
only variables captured via `use($var)` or superglobals should be
available.

**Fixture:**

- [ ] `variable/closure_scope_isolation.fixture` — `$foobar` and `$barfoo` not visible inside closure without `use()`

**Implementation notes:**

During variable resolution, when the cursor is inside a closure body,
restrict the variable search scope to: (a) variables defined within the
closure body, (b) variables explicitly captured in the `use()` clause,
(c) `$this` if the closure is not `static`, and (d) superglobals. Do
not walk past the closure boundary into the enclosing scope.

---

## 25. Pass-by-reference parameter type inference (1 fixture)

**Ref:** [type-inference.md §7](type-inference.md#7-narrow-types-of-var-parameters-after-function-calls)
**Impact: Low · Effort: Medium**

Functions that accept `&$var` parameters can change the variable's type.
After calling such a function, the variable's type should reflect the
function's documented effect (e.g. `preg_match($pattern, $subject, $matches)`
should give `$matches` an array type).

**Fixture:**

- [ ] `variable/pass_by_reference.fixture` — `&$var` parameter type inferred after call

---

## 26. Pipe operator (PHP 8.5) (1 fixture)

**Ref:** [type-inference.md §1](type-inference.md#1-pipe-operator-php-85)
**Impact: Low · Effort: Medium**

The `|>` pipe operator (PHP 8.5) passes the left side as the first
argument to the right side and returns the result.

**Fixture:**

- [ ] `pipe_operator/basic_pipe.fixture` — `$x |> foo(...)` resolves return type

---

## Summary by effort

Moderate wins (Low-Medium effort, few fixtures):

| Task | Fixtures |
|---|---|
| §24 Variable scope isolation in closures | 1 |
| §25 Pass-by-reference parameter type inference | 1 |
| §26 Pipe operator (PHP 8.5) | 1 |

Medium effort, single fixture:

| Task | Fixtures |
|---|---|
| §11 `class-string<T>` on interface method | 1 |
| §16 Generic `@phpstan-assert` with `class-string<T>` | 1 |
| §20 Elseif chain narrowing with `is_*()` | 1 |

Biggest unlocks (Medium effort, many fixtures):

| Task | Fixtures |
|---|---|
| §3 Property-level narrowing | 5 |
| §5 Attribute context support | 3 |