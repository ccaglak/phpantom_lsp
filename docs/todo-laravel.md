# PHPantom — Laravel Support: Remaining Work

> Last updated: 2026-02-26

This document tracks bugs, known gaps, and missing features in
PHPantom's Laravel Eloquent support. For the general architecture and
virtual member provider design, see `ARCHITECTURE.md`.

---

## Missing features

### 2. Closure parameter inference in collection pipelines

`$users->map(fn($u) => $u->...)` does not infer `$u` as the
collection's element type. This is a general generics/callable
inference problem, not Laravel-specific, but Laravel collection
pipelines are the most common place users encounter it.
Other cases:
- MyModel::whereIn()->chunk(self::CHUNK_SIZE, function (Collection $orders) {})
- MyModel::whereHas('order', function (Builder $q) {})
- MyModel::with(['translations' => function (Relation $query) {}]) // translations is the name of the relation on MyModel, Relation will become the return type of that relation

### 3. Go-to-definition for scope methods called through `with()`

`Brand::with('english')->sortable()` does not resolve go-to-definition
for `sortable()`, even though completion works. Compare with
`Brand::with('english')->paginate()` where GTD works fine. The
difference is that `paginate()` is a real Builder method with a source
location, while `sortable()` is a scope method injected onto the
Builder at resolution time without preserving the original declaration
site. The GTD fallback `find_scope_on_builder_model` may not be
triggering for the `with()` return path.

### 4. Blank line inside a method chain breaks collapse logic

When a blank line separates parts of a fluent chain,
`collapse_continuation_lines` stops walking backwards at the empty line
and never reaches the base expression:

```php
Brand::with('english')

    ->paginate(); // neither GTD nor completion works
```

The same chain without the blank line works fine. The backward walk in
`collapse_continuation_lines` treats any line that does not start with
`->` or `?->` as the base. An empty line matches that condition, so the
collapsed result is just `->paginate()` with no subject. Fixing this
requires skipping blank (whitespace-only) lines during the backward
walk.

---

## Out of scope (and why)

| Item | Reason |
|------|--------|
| Container string aliases | Requires booting the application. Use `::class` references instead. |
| Facade `getFacadeAccessor()` with string aliases | Same problem. `@method` tags provide a workable fallback. |
| Blade templates | Large scope, separate project. |
| Model column types from DB/migrations | Unreasonable complexity. Require `@property` annotations (via ide-helper or hand-written). |
| Legacy Laravel versions | We target current Larastan-style annotations. Older code may degrade gracefully. |
| Application provider scanning | Low-value, high-complexity. |

---

## Philosophy (unchanged)

- **No application booting.** We never boot a Laravel application to
  resolve types.
- **No SQL/migration parsing.** Model column types are not inferred from
  database schemas or migration files.
- **Larastan-style hints preferred.** We expect relationship methods to be
  annotated in the style that Larastan expects. Fallback heuristics
  are best-effort.
- **Facades fall back to `@method`.** Facades whose `getFacadeAccessor()`
  returns a string alias cannot be resolved. `@method` tags on facade
  classes provide completion without template intelligence.
