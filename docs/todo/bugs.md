# PHPantom — Bug Fixes

Every bug below must be fixed at its root cause. "Detect the
symptom and suppress the diagnostic" is not an acceptable fix.
If the type resolution pipeline produces wrong data, fix the
pipeline so it produces correct data. Downstream consumers
(diagnostics, hover, completion, definition) should never need
to second-guess upstream output.



## B3 — Array access on bare `array` returns empty instead of `mixed`

**Root cause:** The type resolution pipeline does not handle array
element access on the bare `array` type. When a parameter is typed
as `array` (no generic annotation), accessing an element with
`$params['key']` resolves to an empty/untyped result instead of
`mixed`.

**Where to fix:** The array access resolution code (wherever
`$var['key']` is resolved to a type) must recognise bare `array`
and `mixed` as "unknown element type" and return `mixed`. This is
a fix in the variable/expression type resolution pipeline, not in
any diagnostic.

**Downstream effect:** Once the pipeline returns `mixed` for array
access on bare `array`, the following resolve correctly without any
additional changes:

- `$x = $params['key'] ?? null` resolves `$x` to `mixed|null`
  instead of just `null`.
- `type_error.argument` no longer flags `null` passed to `string`
  because the resolved type is `mixed|null`, which is compatible
  with anything.

Reproducer:

```php
function foo(array $params = []): void {
    $authToken = $params['authToken'] ?? null;
    if (!$authToken || !is_string($authToken)) {
        throw new \Exception('missing');
    }
    // $authToken is string here, but diagnostic sees null
    bar($authToken);
}
function bar(string $s): void {}
```

## B9 — `parent::__construct()` does not substitute `@extends` generics into inherited parameter types

**Root cause:** When a child class has `@extends Parent<Concrete>`
and calls `parent::__construct($arg)`, the diagnostic pipeline
resolves the callable target to the parent's constructor without
applying the child's `@extends` generic substitution. The parent
constructor's `@param ?T $item` retains the raw template name `T`
instead of being substituted with the concrete type from the
child's `@extends` annotation.

**Where to fix:** The callable target resolution for
`parent::__construct(...)` (in `resolve_constructor_callable` or
the `NewExpr` arm of `resolve_callable_target_with_args`) must
detect that the call originates from a child class, look up the
child's `extends_generics`, and apply template substitution to the
parent class before returning its constructor's parameter types.

Reproducer:

```php
/**
 * @template T of object
 */
class ItemResult {
    /** @param ?T $item */
    public function __construct(private readonly ?object $item) {}
}

/**
 * @extends ItemResult<BonusCashItem>
 */
final class BonusCashItemResult extends ItemResult {
    public function __construct(?BonusCashItem $credited) {
        parent::__construct($credited);
        // false positive: "expects ?T, got BonusCashItem"
    }
}

class BonusCashItem {}
```
