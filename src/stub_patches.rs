//! Centralized stub patch system for phpstorm-stubs deficiencies.
//!
//! The embedded [phpstorm-stubs](https://github.com/JetBrains/phpstorm-stubs)
//! sometimes lack `@template` annotations or have overly broad return types
//! (e.g. `mixed`) for functions whose return type actually depends on an
//! argument.  PHPStan solves this with dynamic return type extensions written
//! in PHP; we solve it by patching the parsed [`FunctionInfo`] at load time.
//!
//! This module provides a single entry point, [`apply_function_stub_patches`],
//! that dispatches to per-function patch functions based on the function name.
//! All stub-deficiency workarounds for built-in PHP functions live here,
//! making it easy to audit the full inventory and push fixes upstream.
//!
//! ## When to add a patch here vs. hardcoded logic elsewhere
//!
//! If the correct behaviour can be expressed with `@template` / `@return`
//! annotations (i.e. PHPStan's own stubs already have the fix), it belongs
//! here as a `FunctionInfo` patch.  If the behaviour requires inspecting
//! call-site argument *values* at resolution time (e.g. `array_map`'s
//! callback return type), it must stay as hardcoded logic in
//! `rhs_resolution.rs` / `raw_type_inference.rs`.
//!
//! ## Patch inventory
//!
//! 1. **`array_reduce`** — phpstorm-stubs declare `mixed` return type.
//!    The actual return type is the type of the initial value (3rd argument).
//!    PHPStan expresses this as `@template TReturn` + `@param TReturn $initial`
//!    \+ `@return TReturn`.  We patch the same template/binding/return onto
//!    the parsed `FunctionInfo`.
//!    PHPStan ref: `stubs/arrayFunctions.stub`
//!
//! ## Removing patches
//!
//! When phpstorm-stubs gains proper annotations for a patched function,
//! delete the corresponding patch function here and remove its dispatch
//! from [`apply_function_stub_patches`].  Run the test suite to verify
//! that the stub's own annotations produce the same result.

use crate::atom::atom;
use crate::php_type::PhpType;
use crate::types::FunctionInfo;

/// Apply all registered stub patches to a freshly-parsed function.
///
/// Called from [`find_or_load_function`](crate::resolution) after a
/// `FunctionInfo` is parsed from embedded phpstorm-stubs, before it is
/// cached in `global_functions`.  Only functions with known deficiencies
/// are patched; all others pass through unchanged.
pub fn apply_function_stub_patches(func: &mut FunctionInfo) {
    if func.name.as_str() == "array_reduce" {
        patch_array_reduce(func);
    }
}

/// Patch `array_reduce` to use template-based return type inference.
///
/// phpstorm-stubs signature:
/// ```text
/// function array_reduce(array $array, callable $callback, mixed $initial = null): mixed {}
/// ```
///
/// PHPStan's corrected signature (from `stubs/arrayFunctions.stub`):
/// ```text
/// @template TIn of mixed
/// @template TReturn of mixed
/// @param array<TIn> $array
/// @param callable(TReturn, TIn): TReturn $callback
/// @param TReturn $initial
/// @return TReturn
/// ```
///
/// We only need the `TReturn` template (bound to `$initial`) and the
/// return type override.  `TIn` doesn't affect the return type so we
/// skip it — the existing callable param type from the stub is adequate.
fn patch_array_reduce(func: &mut FunctionInfo) {
    // Only patch if the return type is still the deficient `mixed`.
    let dominated_by_mixed = func.return_type.as_ref().is_some_and(|rt| rt.is_mixed());
    if !dominated_by_mixed {
        return;
    }

    let tpl_name = atom("TReturn");

    // Add template parameter if not already present.
    if !func.template_params.iter().any(|t| t == &tpl_name) {
        func.template_params.push(tpl_name);
    }

    // Bind TReturn to the $initial parameter (3rd positional arg).
    let param_name = atom("$initial");
    if !func.template_bindings.iter().any(|(t, _)| t == &tpl_name) {
        func.template_bindings.push((tpl_name, param_name));
    }

    // Override return type from `mixed` to `TReturn`.
    func.return_type = Some(PhpType::Named(tpl_name.to_string()));
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::atom::atom;
    use crate::php_type::PhpType;
    use crate::test_fixtures::make_param;

    fn make_stub_array_reduce() -> FunctionInfo {
        FunctionInfo {
            name: atom("array_reduce"),
            parameters: vec![
                make_param("$array", Some("array"), true),
                make_param("$callback", Some("callable"), true),
                make_param("$initial", Some("mixed"), false),
            ],
            return_type: Some(PhpType::mixed()),
            ..empty_func_info()
        }
    }

    /// Minimal `FunctionInfo` with all fields zeroed/empty.
    fn empty_func_info() -> FunctionInfo {
        FunctionInfo {
            name: atom(""),
            name_offset: 0,
            parameters: Vec::new(),
            return_type: None,
            native_return_type: None,
            description: None,
            return_description: None,
            links: Vec::new(),
            see_refs: Vec::new(),
            namespace: None,
            conditional_return: None,
            type_assertions: Vec::new(),
            deprecation_message: None,
            deprecated_replacement: None,
            template_params: Vec::new(),
            template_bindings: Vec::new(),
            template_param_bounds: Default::default(),
            throws: Vec::new(),
            is_polyfill: false,
        }
    }

    #[test]
    fn array_reduce_gets_template_return() {
        let mut func = make_stub_array_reduce();
        apply_function_stub_patches(&mut func);

        assert_eq!(
            func.template_params,
            vec![atom("TReturn")],
            "Should add TReturn template param"
        );
        assert_eq!(
            func.template_bindings,
            vec![(atom("TReturn"), atom("$initial"))],
            "Should bind TReturn to $initial"
        );
        assert_eq!(
            func.return_type,
            Some(PhpType::Named("TReturn".to_string())),
            "Return type should be TReturn"
        );
    }

    #[test]
    fn array_reduce_not_patched_when_return_type_already_correct() {
        let mut func = make_stub_array_reduce();
        // Simulate upstream fix: return type is already templated.
        func.return_type = Some(PhpType::Named("TReturn".to_string()));
        func.template_params = vec![atom("TReturn")];

        apply_function_stub_patches(&mut func);

        // Should not double-add template params.
        assert_eq!(func.template_params.len(), 1);
        assert!(
            func.template_bindings.is_empty(),
            "Should not add bindings when return type is not mixed"
        );
    }

    #[test]
    fn unrelated_function_not_patched() {
        let mut func = FunctionInfo {
            name: atom("strlen"),
            return_type: Some(PhpType::int()),
            ..empty_func_info()
        };
        let original_return = func.return_type.clone();

        apply_function_stub_patches(&mut func);

        assert_eq!(func.return_type, original_return);
        assert!(func.template_params.is_empty());
    }
}
