# PHPantom — Bug Fixes

## B3: Variable reassignment inside `try` block not tracked by analyzer

When a variable is assigned one type before a `try` block and then
reassigned to a different type inside the `try`, the analyzer uses the
original type instead of the reassigned type for subsequent accesses
within the same block.

Real-world example — `MollieGateway.php`:

```php
$customer = $request->getCustomerOrFail();   // type: Luxplus Customer
// ...
try {
    $customer = $client->getOrCreateCustoemr($customer);  // reassigned to MollieCustomer
    $molliePayment = $customer->createPayment($paymentData);  // ← analyzer uses original type
}
```

Line 452 reassigns `$customer` from `Luxplus\...\Customer` to
`Mollie\Api\Resources\Customer` (aliased as `MollieCustomer`). Line 453
calls `->createPayment()` which exists on `MollieCustomer` but not on
the Luxplus `Customer` model. The analyzer resolves `$customer` as the
original type, producing an `unknown_member` diagnostic for
`createPayment` and a cascading `unresolved_member_access` for
`$molliePayment->getCheckoutUrl()`.

**Impact:** 2 diagnostics in the shared project (`MollieGateway:453`,
`MollieGateway:462`).

## B4: Relationship property access and BelongsTo return type not resolved by analyzer

Eloquent relationship methods accessed as properties (without `()`) are
resolved correctly in the completion engine via `LaravelModelProvider`,
which synthesizes virtual properties (e.g. `translations()` returning
`HasMany<T>` produces `$translations` typed as `Collection<T>`). However,
the analyzer's member-access checker does not find these synthesized
properties in some cross-file scenarios, reporting
`unresolved_member_access`.

Additionally, calling a relationship method WITH `()` (e.g.
`$translation->category()`) returns a `BelongsTo` type that the LSP can
resolve, but then member lookup on that `BelongsTo` fails to find
methods like `associate()`. The `covariant $this` syntax in generic args
(e.g. `BelongsTo<NotificationCategory, covariant $this>`) may interfere
with type parsing.

A separate sub-issue: `FlowService:477` accesses `$order->orderProducts`
(camelCase) while the model declares the property and relationship method
as `orderproducts` (all lowercase). Laravel normalises via `Str::snake()`
at runtime, but the LSP does a case-sensitive property lookup.

Affected diagnostics:

- `NotificationCategory:52` — `$this->translations` property not resolved
  (HasMany relationship, no `@property` annotation)
- `NotificationObject:114` — `$this->imageFile` property not resolved
  (HasOne relationship, no `@property` annotation)
- `NotificationCategoryService:37` — `$translation->category()->associate()`
  — `BelongsTo` return type resolves but `associate()` not found on it

`FlowService:477` (`$order->orderProducts`) is a case-sensitivity issue
filed separately as B9.

`FlowService:517` is a compound failure: `$reorder->order->orderproducts`
is a relationship property (this bug), then `->reduce()` returns `mixed`
instead of `Decimal` (generic return type inference gap), then `->add()`
fails on the unresolved type.

**Impact:** 4 diagnostics in the shared project
(`NotificationCategory:52`, `NotificationObject:114`,
`NotificationCategoryService:37`, `FlowService:517`).

## B5: `$this->items` on custom Collection subclass not typed

When a class extends `Collection<int, T>` via `@extends`, accessing
`$this->items` should yield `array<int, T>`. Currently, `$this->items`
resolves as `array` (the base `Collection`'s declared property type)
without applying the generic substitution. This means iterating
`$this->items` in a `foreach` or passing it to `array_any()` loses the
element type.

Real-world example — `PurchaseFileProductCollection.php`:

```php
/**
 * @extends Collection<int, PurchaseFileProduct>
 */
final class PurchaseFileProductCollection extends Collection
{
    public function hasIssues(): bool
    {
        return array_any($this->items, fn($item) => $item->order_amount > 0);
        //                                          ^^^^^ unresolved
    }
}
```

`$this->items` should be `array<int, PurchaseFileProduct>`, so `$item`
in the closure should be `PurchaseFileProduct`. Instead, `$item` is
unresolved because the generic substitution is not applied to inherited
properties when accessed via `$this->`.

**Impact:** 2 diagnostics in the shared project
(`PurchaseFileProductCollection:25` — two property accesses on `$item`).

## B6: Scope methods not found on Builder in analyzer chains

PHPantom's completion engine correctly injects scope methods onto
`Builder<ConcreteModel>` via `try_inject_builder_scopes` in
`resolve_named_type`. However, the analyzer's `check_member_on_resolved_classes`
uses `resolve_class_fully_cached` which is keyed by bare FQN without
generic args. A prior cache entry for `Builder` (without model-specific
scopes) is returned, and the scope method is reported as not found.

The analyzer does check `base_classes` first (before the cache) to avoid
this, but in method chains like
`ArticleCategoryTranslation::whereHas(...)->whereLanguage(...)`, the
intermediate `Builder<ArticleCategoryTranslation>` type produced by
`whereHas()` may not carry the scope-injected methods in `base_classes`.

Affected diagnostics (5 direct + 2 cascading):

Direct `unknown_member` — scope method exists on model but not found on
Builder:
- `ArticleRepository:69` — `whereLanguage` (scope on
  `ArticleCategoryTranslation`)
- `ProductRepository:271` — `whereIsLuxury` (scope on `Product`)
- `ProductRepository:272` — `whereIsDerma` (scope on `Product`)
- `ProductRepository:273` — `whereIsProHairCare` (scope on `Product`)
- `ProductRepository:369` — `whereIsLuxury` (scope on `Product`)

Cascading `unresolved_member_access`:
- `EventRepository:23` — `pluck` after broken
  `whereIsBlackFriday()->whereIsVisible()` chain

Note: `EventRepository:22` reports `whereIsVisible` not found on Builder.
Product has `scopeIsVisibleIn` (takes a `Country` parameter) but no
`scopeWhereIsVisible` and no `is_visible` column. This may be a genuine
code bug in the project rather than an LSP issue.

**Impact:** 5–6 direct `unknown_member` diagnostics plus 1–2 cascading.

## B7: PHPDoc `@param` generic array type not merged with native `array` hint

When a method has a native type hint `array` and a PHPDoc `@param` with
a generic type like `list<Request>`, PHPantom doesn't merge the PHPDoc
element type with the native `array` for narrowing purposes. After an
`is_array()` guard, the variable narrows to `array` but loses the `Request`
element type from the docblock.

Real-world example — `MobilePayConnection.php`:

```php
/**
 * @param null|list<Request>|Request $request
 */
protected function connect(string $uri, null|array|Request $request, ...): MobilePayResponse
{
    if (is_array($request)) {
        foreach ($request as $item) {
            $serializedObjects[] = $item->jsonSerialize();
            //                     ^^^^^ unresolved
        }
    }
}
```

After `is_array($request)`, `$request` narrows from `null|array|Request`
to `array`. The `@param` says the array case is `list<Request>`, so
`$item` should be `Request`. But the LSP doesn't unify the narrowed
native `array` with the docblock's `list<Request>`.

**Impact:** 1 diagnostic in the shared project
(`MobilePayConnection:76`).

## B8: Variadic parameter element type lost in `foreach`

When a method declares a variadic parameter with a union type like
`HtmlString|int|string ...$placeholders`, iterating with
`foreach ($placeholders as $value)` should give `$value` the element
type `HtmlString|int|string`. Instead, the LSP resolves `$value` as
untyped (hover returns nothing).

Real-world example — `ShortTexts.php`:

```php
public static function get(int $id, Country $lang, HtmlString|int|string ...$placeholders): HtmlString|string
{
    // ...
    foreach ($placeholders as $value) {
        $isHTMLValue = $value instanceof HtmlString;
        if ($isHTML) {
            $replace[] = $isHTMLValue ? $value->toHtml() : htmlentities((string)$value);
            //                          ^^^^^^ unresolved
        }
    }
}
```

The variadic `...$placeholders` is internally `array<int, HtmlString|int|string>`,
but the LSP doesn't propagate the element type into the `foreach` loop
variable. This is a prerequisite for the `instanceof` narrowing (which
would further narrow `$value` to `HtmlString` in the truthy ternary
branch), but the primary failure is the missing element type.

**Impact:** 1 diagnostic in the shared project (`ShortTexts:79`).

## B9: Eloquent relationship property lookup is case-sensitive

Laravel normalises property names via `Str::snake()` at runtime, so
`$order->orderProducts` and `$order->orderproducts` both resolve to the
same relationship. PHPantom's property lookup is case-sensitive, so when
code uses `orderProducts` (camelCase) but the model declares the
relationship method and `@property` as `orderproducts` (all lowercase),
the property is not found.

Real-world example — `FlowService.php`:

```php
// FlowService line 477:
$items = $order->orderProducts->map(...);
//              ^^^^^^^^^^^^^^ camelCase — not found

// Order model declares:
public function orderproducts(): HasMany { ... }
// and @property uses 'orderproducts' (lowercase)
```

The fix should apply `Str::snake()`-equivalent normalisation (or
case-insensitive matching) when looking up relationship-derived virtual
properties on Eloquent models.

**Impact:** 1 direct diagnostic (`FlowService:477`) plus 1 cascading
(`FlowService:517` — compound with `Collection::reduce()` type loss).