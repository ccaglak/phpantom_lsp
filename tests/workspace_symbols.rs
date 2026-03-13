mod common;

use common::create_test_backend;
use std::path::PathBuf;
use std::sync::Arc;
use tower_lsp::lsp_types::*;

#[allow(deprecated)] // SymbolInformation::deprecated is deprecated in the LSP types crate
fn get_workspace_symbols(php: &str, query: &str) -> Vec<SymbolInformation> {
    let backend = create_test_backend();
    let uri = "file:///test.php";
    backend
        .open_files()
        .write()
        .insert(uri.to_string(), Arc::new(php.to_string()));
    backend.update_ast(uri, php);
    backend.handle_workspace_symbol(query).unwrap_or_default()
}

#[allow(deprecated)]
fn get_workspace_symbols_multi(files: &[(&str, &str)], query: &str) -> Vec<SymbolInformation> {
    let backend = create_test_backend();
    for (uri, php) in files {
        backend
            .open_files()
            .write()
            .insert(uri.to_string(), Arc::new(php.to_string()));
        backend.update_ast(uri, php);
    }
    backend.handle_workspace_symbol(query).unwrap_or_default()
}

// ─── Empty file ─────────────────────────────────────────────────────────────

#[test]
fn empty_file_returns_empty() {
    let symbols = get_workspace_symbols("<?php\n", "");
    assert!(symbols.is_empty(), "expected no symbols for empty file");
}

// ─── Classes ────────────────────────────────────────────────────────────────

#[test]
fn class_appears_in_results() {
    let php = r#"<?php
class UserService {
    public function find(): void {}
}
"#;
    let symbols = get_workspace_symbols(php, "");
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(
        names.contains(&"UserService"),
        "expected UserService in {names:?}"
    );
}

#[test]
fn class_has_class_kind() {
    let php = r#"<?php
class Foo {}
"#;
    let symbols = get_workspace_symbols(php, "Foo");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].kind, SymbolKind::CLASS);
}

// ─── Interfaces, traits, enums ──────────────────────────────────────────────

#[test]
fn interface_has_interface_kind() {
    let php = r#"<?php
interface Renderable {
    public function render(): string;
}
"#;
    let symbols = get_workspace_symbols(php, "Renderable");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].kind, SymbolKind::INTERFACE);
    assert_eq!(symbols[0].name, "Renderable");
}

#[test]
fn trait_has_class_kind() {
    let php = r#"<?php
trait Cacheable {
    public function cache(): void {}
}
"#;
    let symbols = get_workspace_symbols(php, "Cacheable");
    assert_eq!(symbols.len(), 1);
    // Traits map to CLASS because LSP has no dedicated TRAIT kind.
    assert_eq!(symbols[0].kind, SymbolKind::CLASS);
}

#[test]
fn enum_has_enum_kind() {
    let php = r#"<?php
enum Color {
    case Red;
    case Green;
    case Blue;
}
"#;
    let symbols = get_workspace_symbols(php, "Color");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].kind, SymbolKind::ENUM);
}

// ─── Query filtering ────────────────────────────────────────────────────────

#[test]
fn query_filters_by_name_substring_case_insensitive() {
    let php = r#"<?php
class UserRepository {}
class ProductRepository {}
class OrderService {}
"#;
    let symbols = get_workspace_symbols(php, "repo");
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(names.contains(&"UserRepository"), "expected UserRepository");
    assert!(
        names.contains(&"ProductRepository"),
        "expected ProductRepository"
    );
    assert!(
        !names.contains(&"OrderService"),
        "OrderService should not match 'repo'"
    );
}

#[test]
fn query_is_case_insensitive() {
    let php = r#"<?php
class FooBar {}
"#;
    let lower = get_workspace_symbols(php, "foobar");
    assert_eq!(lower.len(), 1);
    let upper = get_workspace_symbols(php, "FOOBAR");
    assert_eq!(upper.len(), 1);
    let mixed = get_workspace_symbols(php, "FoObAr");
    assert_eq!(mixed.len(), 1);
}

#[test]
fn empty_query_returns_all_symbols() {
    let php = r#"<?php
class Alpha {}
class Beta {}
interface Gamma {}
"#;
    let symbols = get_workspace_symbols(php, "");
    assert_eq!(symbols.len(), 3, "empty query should return all 3 symbols");
}

// ─── Functions ──────────────────────────────────────────────────────────────

#[test]
fn functions_appear_in_results() {
    let php = r#"<?php
function myHelperFunction(): void {}
"#;
    let symbols = get_workspace_symbols(php, "myHelper");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].name, "myHelperFunction");
    assert_eq!(symbols[0].kind, SymbolKind::FUNCTION);
}

#[test]
fn function_query_filter_works() {
    let php = r#"<?php
function sendEmail(): void {}
function sendSms(): void {}
function receiveMessage(): void {}
"#;
    let symbols = get_workspace_symbols(php, "send");
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(names.contains(&"sendEmail"), "expected sendEmail");
    assert!(names.contains(&"sendSms"), "expected sendSms");
    assert!(
        !names.contains(&"receiveMessage"),
        "receiveMessage should not match 'send'"
    );
}

// ─── Constants ──────────────────────────────────────────────────────────────

#[test]
fn constants_appear_in_results() {
    let php = r#"<?php
define('APP_VERSION', '1.0.0');
"#;
    let symbols = get_workspace_symbols(php, "APP_VERSION");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].name, "APP_VERSION");
    assert_eq!(symbols[0].kind, SymbolKind::CONSTANT);
}

#[test]
fn top_level_const_appears_in_results() {
    let php = r#"<?php
const MAX_RETRIES = 3;
"#;
    let symbols = get_workspace_symbols(php, "MAX_RETRIES");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].name, "MAX_RETRIES");
    assert_eq!(symbols[0].kind, SymbolKind::CONSTANT);
}

// ─── Deprecated symbols ────────────────────────────────────────────────────

#[test]
fn deprecated_class_has_deprecated_tag() {
    let php = r#"<?php
/**
 * @deprecated Use NewService instead
 */
class OldService {}
"#;
    let symbols = get_workspace_symbols(php, "OldService");
    assert_eq!(symbols.len(), 1);
    let tags = symbols[0].tags.as_ref().expect("expected tags");
    assert!(
        tags.contains(&SymbolTag::DEPRECATED),
        "expected DEPRECATED tag"
    );
}

#[test]
fn non_deprecated_class_has_no_deprecated_tag() {
    let php = r#"<?php
class FreshService {}
"#;
    let symbols = get_workspace_symbols(php, "FreshService");
    assert_eq!(symbols.len(), 1);
    assert!(
        symbols[0].tags.is_none(),
        "non-deprecated class should have no tags"
    );
}

#[test]
fn deprecated_function_has_deprecated_tag() {
    let php = r#"<?php
/**
 * @deprecated Use newHelper() instead
 */
function oldHelper(): void {}
"#;
    let symbols = get_workspace_symbols(php, "oldHelper");
    assert_eq!(symbols.len(), 1);
    let tags = symbols[0].tags.as_ref().expect("expected tags");
    assert!(
        tags.contains(&SymbolTag::DEPRECATED),
        "expected DEPRECATED tag on function"
    );
}

// ─── Namespaces ─────────────────────────────────────────────────────────────

#[test]
fn namespace_appears_as_container_name() {
    let php = r#"<?php
namespace App\Models;

class User {}
"#;
    let symbols = get_workspace_symbols(php, "User");
    assert_eq!(symbols.len(), 1);
    assert_eq!(
        symbols[0].container_name.as_deref(),
        Some("App\\Models"),
        "container_name should be the namespace"
    );
}

#[test]
fn class_fqn_used_as_symbol_name() {
    let php = r#"<?php
namespace App\Models;

class User {}
"#;
    let symbols = get_workspace_symbols(php, "User");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].name, "App\\Models\\User");
}

#[test]
fn function_namespace_appears_as_container_name() {
    let php = r#"<?php
namespace App\Helpers;

function formatDate(): string { return ''; }
"#;
    let symbols = get_workspace_symbols(php, "formatDate");
    assert_eq!(symbols.len(), 1);
    assert_eq!(
        symbols[0].container_name.as_deref(),
        Some("App\\Helpers"),
        "function container_name should be the namespace"
    );
}

#[test]
fn query_matches_fqn_with_namespace() {
    let php = r#"<?php
namespace App\Models;

class User {}
"#;
    // Query should match against the FQN including namespace.
    let symbols = get_workspace_symbols(php, "App\\Models");
    assert_eq!(symbols.len(), 1);
    assert_eq!(symbols[0].name, "App\\Models\\User");
}

// ─── Multiple classes ───────────────────────────────────────────────────────

#[test]
fn multiple_classes_in_one_file_all_appear() {
    let php = r#"<?php
class First {}
class Second {}
class Third {}
"#;
    let symbols = get_workspace_symbols(php, "");
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(names.contains(&"First"), "expected First in {names:?}");
    assert!(names.contains(&"Second"), "expected Second in {names:?}");
    assert!(names.contains(&"Third"), "expected Third in {names:?}");
}

#[test]
fn symbols_from_multiple_files() {
    let symbols = get_workspace_symbols_multi(
        &[
            ("file:///a.php", "<?php\nclass AlphaClass {}"),
            ("file:///b.php", "<?php\nclass BetaClass {}"),
        ],
        "",
    );
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(names.contains(&"AlphaClass"), "expected AlphaClass");
    assert!(names.contains(&"BetaClass"), "expected BetaClass");
}

// ─── Exclusions ─────────────────────────────────────────────────────────────

#[test]
fn anonymous_classes_excluded() {
    // Anonymous classes get a synthetic name like "anonymous@123" in the parser.
    // They should not appear in workspace symbols.
    let php = r#"<?php
class Named {}
$x = new class {
    public function hello(): void {}
};
"#;
    let symbols = get_workspace_symbols(php, "");
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(names.contains(&"Named"), "expected Named");
    // Ensure no anonymous class entries sneak in.
    for name in &names {
        assert!(
            !name.starts_with("anonymous"),
            "anonymous class should be excluded, found: {name}"
        );
    }
}

// ─── Mixed symbol types ────────────────────────────────────────────────────

#[test]
fn mixed_symbol_types_all_appear() {
    let php = r#"<?php
class MyClass {}
interface MyInterface {}
trait MyTrait {}
enum MyEnum { case A; }
function myFunction(): void {}
define('MY_CONST', 42);
"#;
    let symbols = get_workspace_symbols(php, "My");
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(names.contains(&"MyClass"), "expected MyClass in {names:?}");
    assert!(
        names.contains(&"MyInterface"),
        "expected MyInterface in {names:?}"
    );
    assert!(names.contains(&"MyTrait"), "expected MyTrait in {names:?}");
    assert!(names.contains(&"MyEnum"), "expected MyEnum in {names:?}");
    assert!(
        names.contains(&"myFunction"),
        "expected myFunction in {names:?}"
    );
    assert!(
        names.contains(&"MY_CONST"),
        "expected MY_CONST in {names:?}"
    );
}

// ─── No match returns None ──────────────────────────────────────────────────

#[test]
fn no_match_returns_empty() {
    let php = r#"<?php
class Foo {}
"#;
    let symbols = get_workspace_symbols(php, "zzzzNonExistent");
    assert!(
        symbols.is_empty(),
        "expected no results for non-matching query"
    );
}

// ─── Location correctness ───────────────────────────────────────────────────

#[test]
fn class_location_points_to_correct_file_uri() {
    let php = r#"<?php
class Located {}
"#;
    let symbols = get_workspace_symbols(php, "Located");
    assert_eq!(symbols.len(), 1);
    assert_eq!(
        symbols[0].location.uri.as_str(),
        "file:///test.php",
        "location URI should match the file"
    );
}

#[test]
fn function_location_points_to_correct_file_uri() {
    let php = r#"<?php
function locatedFunc(): void {}
"#;
    let symbols = get_workspace_symbols(php, "locatedFunc");
    assert_eq!(symbols.len(), 1);
    assert_eq!(
        symbols[0].location.uri.as_str(),
        "file:///test.php",
        "function location URI should match the file"
    );
}

// ─── class_index source ─────────────────────────────────────────────────────

#[test]
#[allow(deprecated)]
fn class_index_entry_appears_when_query_matches() {
    let backend = create_test_backend();
    {
        let mut idx = backend.class_index().write();
        idx.insert(
            "Vendor\\Package\\Widget".to_string(),
            "file:///vendor/package/src/Widget.php".to_string(),
        );
    }
    let symbols = backend
        .handle_workspace_symbol("Widget")
        .unwrap_or_default();
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(
        names.contains(&"Vendor\\Package\\Widget"),
        "expected Vendor\\Package\\Widget in {names:?}"
    );
}

#[test]
#[allow(deprecated)]
fn class_index_not_searched_on_empty_query() {
    let backend = create_test_backend();
    {
        let mut idx = backend.class_index().write();
        idx.insert(
            "Vendor\\Lib\\Gadget".to_string(),
            "file:///vendor/lib/src/Gadget.php".to_string(),
        );
    }
    let symbols = backend.handle_workspace_symbol("").unwrap_or_default();
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(
        !names.contains(&"Vendor\\Lib\\Gadget"),
        "class_index should not be searched on empty query, got {names:?}"
    );
}

#[test]
#[allow(deprecated)]
fn class_index_deduplicates_with_ast_map() {
    let backend = create_test_backend();
    let uri = "file:///test.php";
    let php = "<?php\nclass Foo {}\n";
    backend
        .open_files()
        .write()
        .insert(uri.to_string(), Arc::new(php.to_string()));
    backend.update_ast(uri, php);
    // Also add to class_index — should not produce a duplicate.
    {
        let mut idx = backend.class_index().write();
        idx.insert("Foo".to_string(), uri.to_string());
    }
    let symbols = backend.handle_workspace_symbol("Foo").unwrap_or_default();
    let foo_count = symbols.iter().filter(|s| s.name == "Foo").count();
    assert_eq!(
        foo_count, 1,
        "Foo should appear exactly once, got {foo_count}"
    );
}

#[test]
#[allow(deprecated)]
fn class_index_has_namespace_as_container() {
    let backend = create_test_backend();
    {
        let mut idx = backend.class_index().write();
        idx.insert(
            "App\\Services\\PaymentService".to_string(),
            "file:///src/Services/PaymentService.php".to_string(),
        );
    }
    let symbols = backend
        .handle_workspace_symbol("Payment")
        .unwrap_or_default();
    assert_eq!(symbols.len(), 1);
    assert_eq!(
        symbols[0].container_name.as_deref(),
        Some("App\\Services"),
        "container_name should be the namespace"
    );
}

#[test]
#[allow(deprecated)]
fn class_index_uses_fqn_index_for_kind() {
    let backend = create_test_backend();
    {
        let mut idx = backend.class_index().write();
        idx.insert(
            "App\\Contracts\\Renderable".to_string(),
            "file:///src/Contracts/Renderable.php".to_string(),
        );
    }
    // Populate fqn_index with rich metadata so the handler picks it up.
    {
        let uri = "file:///src/Contracts/Renderable.php";
        let php = "<?php\nnamespace App\\Contracts;\ninterface Renderable { public function render(): string; }\n";
        backend
            .open_files()
            .write()
            .insert(uri.to_string(), Arc::new(php.to_string()));
        backend.update_ast(uri, php);
    }
    let symbols = backend
        .handle_workspace_symbol("Renderable")
        .unwrap_or_default();
    let iface = symbols
        .iter()
        .find(|s| s.name.contains("Renderable"))
        .expect("expected Renderable");
    assert_eq!(
        iface.kind,
        SymbolKind::INTERFACE,
        "fqn_index should provide INTERFACE kind"
    );
}

// ─── classmap source ────────────────────────────────────────────────────────

#[test]
#[allow(deprecated)]
fn classmap_entry_appears_when_query_matches() {
    let backend = create_test_backend();
    {
        let mut cmap = backend.classmap().write();
        cmap.insert(
            "Illuminate\\Support\\Collection".to_string(),
            PathBuf::from("/vendor/laravel/framework/src/Illuminate/Support/Collection.php"),
        );
    }
    let symbols = backend
        .handle_workspace_symbol("Collection")
        .unwrap_or_default();
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(
        names.contains(&"Illuminate\\Support\\Collection"),
        "expected Collection in {names:?}"
    );
}

#[test]
#[allow(deprecated)]
fn classmap_not_searched_on_empty_query() {
    let backend = create_test_backend();
    {
        let mut cmap = backend.classmap().write();
        cmap.insert(
            "Carbon\\Carbon".to_string(),
            PathBuf::from("/vendor/nesbot/carbon/src/Carbon/Carbon.php"),
        );
    }
    let symbols = backend.handle_workspace_symbol("").unwrap_or_default();
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(
        !names.contains(&"Carbon\\Carbon"),
        "classmap should not be searched on empty query, got {names:?}"
    );
}

#[test]
#[allow(deprecated)]
fn classmap_deduplicates_with_ast_map() {
    let backend = create_test_backend();
    let uri = "file:///src/Models/User.php";
    let php = "<?php\nnamespace App\\Models;\nclass User {}\n";
    backend
        .open_files()
        .write()
        .insert(uri.to_string(), Arc::new(php.to_string()));
    backend.update_ast(uri, php);
    // Also add to classmap — should not produce a duplicate.
    {
        let mut cmap = backend.classmap().write();
        cmap.insert(
            "App\\Models\\User".to_string(),
            PathBuf::from("/src/Models/User.php"),
        );
    }
    let symbols = backend.handle_workspace_symbol("User").unwrap_or_default();
    let user_count = symbols
        .iter()
        .filter(|s| s.name == "App\\Models\\User")
        .count();
    assert_eq!(
        user_count, 1,
        "User should appear exactly once, got {user_count}"
    );
}

#[test]
#[allow(deprecated)]
fn classmap_deduplicates_with_class_index() {
    let backend = create_test_backend();
    // Same FQN in both class_index and classmap.
    {
        let mut idx = backend.class_index().write();
        idx.insert(
            "Vendor\\Pkg\\Thing".to_string(),
            "file:///vendor/pkg/src/Thing.php".to_string(),
        );
    }
    {
        let mut cmap = backend.classmap().write();
        cmap.insert(
            "Vendor\\Pkg\\Thing".to_string(),
            PathBuf::from("/vendor/pkg/src/Thing.php"),
        );
    }
    let symbols = backend.handle_workspace_symbol("Thing").unwrap_or_default();
    let thing_count = symbols
        .iter()
        .filter(|s| s.name == "Vendor\\Pkg\\Thing")
        .count();
    assert_eq!(
        thing_count, 1,
        "Thing should appear exactly once, got {thing_count}"
    );
}

#[test]
#[allow(deprecated)]
fn classmap_has_namespace_as_container() {
    let backend = create_test_backend();
    {
        let mut cmap = backend.classmap().write();
        cmap.insert(
            "Symfony\\Component\\HttpFoundation\\Request".to_string(),
            PathBuf::from("/vendor/symfony/http-foundation/Request.php"),
        );
    }
    let symbols = backend
        .handle_workspace_symbol("Request")
        .unwrap_or_default();
    assert_eq!(symbols.len(), 1);
    assert_eq!(
        symbols[0].container_name.as_deref(),
        Some("Symfony\\Component\\HttpFoundation"),
        "container_name should be the namespace"
    );
}

#[test]
#[allow(deprecated)]
fn classmap_location_uri_is_file_uri() {
    let backend = create_test_backend();
    {
        let mut cmap = backend.classmap().write();
        cmap.insert(
            "Monolog\\Logger".to_string(),
            PathBuf::from("/vendor/monolog/monolog/src/Monolog/Logger.php"),
        );
    }
    let symbols = backend
        .handle_workspace_symbol("Logger")
        .unwrap_or_default();
    assert_eq!(symbols.len(), 1);
    assert!(
        symbols[0].location.uri.scheme() == "file",
        "location URI should use file:// scheme, got: {}",
        symbols[0].location.uri
    );
}

// ─── Mixed sources ──────────────────────────────────────────────────────────

#[test]
#[allow(deprecated)]
fn query_finds_symbols_across_all_sources() {
    let backend = create_test_backend();

    // ast_map source
    let uri = "file:///test.php";
    let php = "<?php\nclass MyService {}\n";
    backend
        .open_files()
        .write()
        .insert(uri.to_string(), Arc::new(php.to_string()));
    backend.update_ast(uri, php);

    // class_index source
    {
        let mut idx = backend.class_index().write();
        idx.insert(
            "Vendor\\MyHelper".to_string(),
            "file:///vendor/helper.php".to_string(),
        );
    }

    // classmap source
    {
        let mut cmap = backend.classmap().write();
        cmap.insert(
            "External\\MyWidget".to_string(),
            PathBuf::from("/vendor/external/MyWidget.php"),
        );
    }

    let symbols = backend.handle_workspace_symbol("My").unwrap_or_default();
    let names: Vec<&str> = symbols.iter().map(|s| s.name.as_str()).collect();
    assert!(
        names.contains(&"MyService"),
        "expected MyService from ast_map in {names:?}"
    );
    assert!(
        names.contains(&"Vendor\\MyHelper"),
        "expected MyHelper from class_index in {names:?}"
    );
    assert!(
        names.contains(&"External\\MyWidget"),
        "expected MyWidget from classmap in {names:?}"
    );
}
