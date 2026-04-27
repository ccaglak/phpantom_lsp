# PHPantom — Bug Fixes

Every bug below must be fixed at its root cause. "Detect the
symptom and suppress the diagnostic" is not an acceptable fix.
If the type resolution pipeline produces wrong data, fix the
pipeline so it produces correct data. Downstream consumers
(diagnostics, hover, completion, definition) should never need
to second-guess upstream output.

## B4. Array shape key not narrowed through conditional reassignment

**Discovered:** Psalm `TypeReconciliation/ConditionalTest.php` porting.

```php
/** @var array{test: ?int} */
$a = ["test" => null];
if ($a["test"] === null) { $a = $dummy; }
$var = $a["test"];
```
After the conditional, `$var` should be `int` (null was either
replaced by `$dummy` which has `int`, or was not null to begin with).
Currently resolves as `?int`.

**Test:** `tests/phpstan_nsrt/psalm-conditional.php` (SKIP on
`ArrayAssignmentPropagation`).

**When fixed:** Remove the `// SKIP` from the `int` assertion in
`tests/phpstan_nsrt/psalm-conditional.php` and verify it passes.

## B5. Type not restored to base class after instanceof + reassignment

**Discovered:** Psalm `TypeReconciliation/ConditionalTest.php` porting.

```php
$a = getA(); // returns ClassResolvesBack
if ($a instanceof ClassResolvesBackChild) {
    $a = new ClassResolvesBackChild;
}
```
After the if block, `$a` should be `ClassResolvesBack` (both
branches produce a value assignable to ClassResolvesBack). Currently
resolves as `ClassResolvesBackChild|ClassResolvesBack`.

**Test:** `tests/phpstan_nsrt/psalm-conditional.php` (SKIP on
`ClassResolvesBack`).

**When fixed:** Remove the `// SKIP` from the `ClassResolvesBack`
assertion in `tests/phpstan_nsrt/psalm-conditional.php` and verify
it passes.

## Bulk un-SKIP after fixes

Beyond B1-B5, there are 116 additional `// SKIP` markers across
`tests/psalm_assertions/*.php` covering broader gaps (generic
substitution, loop narrowing, @method resolution, etc.). These are
tracked in the test-porting plan under Phase 5G. When working on
any type engine improvement, grep for `// SKIP` in the assertion
files to find tests that may now pass. Run
`cargo nextest run --test assert_type_runner --no-fail-fast` with
the SKIP removed to verify.

## B6. Superlinear hover scaling on large single files

**Discovered:** Psalm `ArrayFunctionCallTest.php` porting (Phase 3.5B).

A 1095-line PHP file with 88 `assertType()` calls (each requiring a
hover) takes 126s to process. Splitting into two ~550-line halves takes
11s + 14s = 25s total. The 5x slowdown suggests O(n*m) or worse
behavior where the forward walker or type resolution restarts from the
file beginning for each hover, and/or resolved types are not cached
between hover requests on the same file content.

**Repro:** Run the extraction script on `ArrayFunctionCallTest.php`
and place the output in `tests/psalm_assertions/`, then run the
assert_type_runner.

**Expected:** Processing time should scale roughly linearly with file
size and assertion count.

## B7. `empty()` narrowing resolves to `null` instead of `mixed|null`

**Discovered:** Psalm `TypeReconciliation/EmptyTest.php` porting
(Phase 3.5B).

When `empty($a)` is true for a `mixed` parameter, the variable should
retain its base type intersected with falsy values (`mixed|null`), not
collapse entirely to `null`.

**When fixed:** Create `tests/psalm_assertions/type_reconciliation_empty.php`
with this content and verify it passes:

```php
<?php
// Source: Psalm TypeReconciliation/EmptyTest.php
namespace PsalmTest_type_reconciliation_empty_1 {
    /** @param mixed $a */
    function foo($a): void {
        if (empty($a)) {
            assertType('mixed|null', $a);
        }
    }
}
```