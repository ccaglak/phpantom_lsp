# PHPantom — Bug Fixes

Every bug below must be fixed at its root cause. "Detect the
symptom and suppress the diagnostic" is not an acceptable fix.
If the type resolution pipeline produces wrong data, fix the
pipeline so it produces correct data. Downstream consumers
(diagnostics, hover, completion, definition) should never need
to second-guess upstream output.


## B16. PDOStatement fetch mode-dependent return types

**Blocked on:** [phpstorm-stubs#1882](https://github.com/JetBrains/phpstorm-stubs/pull/1882)

`PDOStatement::fetch()` and `PDOStatement::fetchAll()` return
different types depending on the fetch mode constant passed as
the first argument. Once the upstream PR is merged and we update
our stubs, the existing conditional return type support should
handle this automatically.

**Tests:** Assertion lines were removed from
`tests/psalm_assertions/method_call.php` (out of scope until
upstream stubs land).


## B17. Double-`$` prefix in assignment dependency tracking

`src/completion/variable/forward_walk.rs` L5972-5977
(`collect_expr_assignment_deps`) and L5985-5987
(`collect_rhs_variables`) use `format!("${}", dv.name)` to
construct variable names. Since `dv.name` already includes the
`$` prefix (e.g. `"$fn"`), this produces `"$$fn"`. The bug is
latent because both the LHS key and the RHS set values are
consistently double-prefixed, so dependency tracking still
works. However, any code that compares these names against
normally-prefixed variable names (single `$`) would fail to
match.

**Fix:** Remove the `format!("${}", ...)` wrapper and use
`dv.name.to_string()` directly in both functions.

