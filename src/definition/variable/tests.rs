use super::*;
use crate::parser::with_parsed_program;

/// Helper: parse PHP code and find a variable definition.
fn find_def(php: &str, var_name: &str, cursor_offset: u32) -> VarDefSearchResult {
    with_parsed_program(php, "test", |program, content| {
        find_variable_definition_in_program(program, content, var_name, cursor_offset)
    })
}

/// Helper: find the byte offset of a substring occurrence in the source.
/// `occurrence` is 0-based (0 = first, 1 = second, etc.).
fn find_offset(src: &str, needle: &str, occurrence: usize) -> u32 {
    let mut start = 0;
    for _ in 0..=occurrence {
        let pos = src[start..]
            .find(needle)
            .unwrap_or_else(|| panic!("Could not find occurrence {} of {:?}", occurrence, needle));
        if start == 0 && occurrence == 0 {
            return pos as u32;
        }
        start += pos + 1;
    }
    (start - 1) as u32
}

#[test]
fn assignment_found() {
    let php = "<?php\n$foo = 42;\necho $foo;\n";
    // cursor on the `$foo` in `echo $foo`
    let cursor = find_offset(php, "$foo", 1);
    match find_def(php, "$foo", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$foo", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn at_definition_returns_at_definition() {
    let php = "<?php\n$foo = 42;\n";
    let cursor = find_offset(php, "$foo", 0);
    assert!(matches!(
        find_def(php, "$foo", cursor),
        VarDefSearchResult::AtDefinition
    ));
}

#[test]
fn array_access_assignment_found() {
    let php = "<?php\nfunction z() {\n    $z['a']['x'] = 'a';\n    $z['b']['y'] = 'a';\n    $z['c']['z'] = 'a';\n}\n";
    // Cursor on `$z` in the 3rd assignment — should jump to the first (where $z is created).
    let cursor = find_offset(php, "$z", 2);
    match find_def(php, "$z", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$z", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn array_access_after_direct_assignment() {
    let php = "<?php\nfunction z() {\n    $z = [];\n    $z['a']['x'] = 'a';\n    $z['b']['y'] = 'a';\n}\n";
    // Cursor on 3rd $z (last array access) — should jump to `$z = []`.
    let cursor = find_offset(php, "$z", 2);
    match find_def(php, "$z", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$z", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn array_access_after_reassignment() {
    // Direct assignment redefines: array accesses after it should jump to the reassignment.
    let php = "<?php\nfunction z() {\n    $z['c']['z'] = 'a';\n    $z = [];\n    $z['a']['x'] = 'a';\n    $z['b']['y'] = 'a';\n}\n";
    // Cursor on last $z — should jump to `$z = []` (the reassignment).
    let cursor = find_offset(php, "$z", 3);
    match find_def(php, "$z", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            // `$z = []` is the 2nd occurrence of $z
            let def_offset = find_offset(php, "$z", 1);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn conditional_assignment_does_not_override_definition() {
    // Assignment inside if-block should not override the outer definition.
    let php = "<?php\nfunction z() {\n    $z = [];\n    if (random()) {\n        $z = ['a' => []];\n    }\n    $z['a']['x'] = 'a';\n}\n";
    // Cursor on last $z — should jump to the first `$z = []`, not the one inside if.
    let cursor = find_offset(php, "$z", 2);
    match find_def(php, "$z", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$z", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn conditional_direct_assignment_does_not_override() {
    // Same principle for direct variable usage after conditional reassignment.
    let php = "<?php\nfunction b() {\n    $z = 'a';\n    if (random()) {\n        $z = 'b';\n    }\n    echo $z;\n}\n";
    // Cursor on `$z` in `echo $z` — should jump to `$z = 'a'`.
    let cursor = find_offset(php, "$z", 2);
    match find_def(php, "$z", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$z", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn inner_scope_assignment_found_when_cursor_inside() {
    // When cursor is inside the conditional block, the inner assignment is the definition.
    let php = "<?php\nfunction b() {\n    $z = 'a';\n    if (random()) {\n        $z = 'b';\n        echo $z;\n    }\n}\n";
    // Cursor on `$z` in `echo $z` inside the if block — should jump to `$z = 'b'`.
    let cursor = find_offset(php, "$z", 2);
    match find_def(php, "$z", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            // `$z = 'b'` is the 2nd occurrence
            let def_offset = find_offset(php, "$z", 1);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn conditional_only_definition_found_from_outer_scope() {
    // Variable only defined inside a conditional — usage after should still find it.
    let php = "<?php\nfunction c() {\n    if (random()) {\n        $z = 'b';\n        echo $z;\n    }\n    echo $z;\n}\n";
    // Cursor on `$z` in the outer `echo $z` — best match is `$z = 'b'` inside if.
    let cursor = find_offset(php, "$z", 2);
    match find_def(php, "$z", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$z", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn parameter_found() {
    let php = "<?php\nfunction test($bar) {\n    echo $bar;\n}\n";
    let cursor = find_offset(php, "$bar", 1);
    match find_def(php, "$bar", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$bar", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn foreach_value_found() {
    let php = "<?php\nforeach ($items as $item) {\n    echo $item;\n}\n";
    // The cursor on `$item` in `echo $item`
    let cursor = find_offset(php, "$item;", 0);
    match find_def(php, "$item", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            // The definition is the `$item` in `as $item`
            let def_offset = find_offset(php, "$item)", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn foreach_key_found() {
    let php = "<?php\nforeach ($items as $key => $val) {\n    echo $key;\n}\n";
    let cursor = find_offset(php, "$key;", 0);
    match find_def(php, "$key", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$key =>", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn catch_variable_found() {
    let php = "<?php\ntry {\n} catch (Exception $e) {\n    echo $e;\n}\n";
    let cursor = find_offset(php, "$e;", 0);
    match find_def(php, "$e", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$e)", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn static_variable_found() {
    let php = "<?php\nfunction test() {\n    static $count = 0;\n    $count++;\n}\n";
    let cursor = find_offset(php, "$count+", 0);
    match find_def(php, "$count", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$count =", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn global_variable_found() {
    let php = "<?php\nfunction test() {\n    global $config;\n    echo $config;\n}\n";
    // Find the `$config` in `echo $config;` — use the "echo " prefix to
    // locate the right occurrence.
    let echo_pos = php.find("echo $config").unwrap();
    let cursor = (echo_pos + "echo ".len()) as u32;
    match find_def(php, "$config", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            // The definition is the `$config` in `global $config;`.
            let expected = php.find("$config").unwrap() as u32;
            assert_eq!(offset, expected);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn array_destructuring_found() {
    let php = "<?php\n[$a, $b] = explode(',', $str);\necho $a;\n";
    let cursor = find_offset(php, "$a;", 0);
    match find_def(php, "$a", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$a,", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn list_destructuring_found() {
    let php = "<?php\nlist($a, $b) = func();\necho $a;\n";
    let cursor = find_offset(php, "$a;", 0);
    match find_def(php, "$a", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$a,", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn method_parameter_found() {
    let php = concat!(
        "<?php\n",
        "class Foo {\n",
        "    public function bar(string $x): void {\n",
        "        echo $x;\n",
        "    }\n",
        "}\n",
    );
    let cursor = find_offset(php, "$x;", 0);
    match find_def(php, "$x", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$x)", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn most_recent_assignment_wins() {
    let php = "<?php\n$x = 1;\n$x = 2;\necho $x;\n";
    let cursor = find_offset(php, "$x;", 0);
    match find_def(php, "$x", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            // Should find `$x = 2` (second assignment), not `$x = 1`.
            let second_assign = find_offset(php, "$x = 2", 0);
            assert_eq!(offset, second_assign);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn not_found_when_no_definition() {
    let php = "<?php\necho $unknown;\n";
    let cursor = find_offset(php, "$unknown", 0);
    assert!(matches!(
        find_def(php, "$unknown", cursor),
        VarDefSearchResult::NotFound
    ));
}

#[test]
fn closure_scope_isolation() {
    let php = concat!(
        "<?php\n",
        "$outer = 1;\n",
        "$fn = function($inner) {\n",
        "    echo $inner;\n",
        "};\n",
    );
    // Cursor on `$inner` in the echo — should find the parameter.
    let echo_pos = php.find("echo $inner").unwrap();
    let cursor = (echo_pos + "echo ".len()) as u32;
    match find_def(php, "$inner", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$inner)", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}

#[test]
fn arrow_function_parameter() {
    let php = "<?php\n$fn = fn($x) => $x + 1;\n";
    // Cursor on `$x` after `=>` — find the unique `$x +` pattern
    let body_pos = php.find("$x + 1").unwrap();
    let cursor = body_pos as u32;
    match find_def(php, "$x", cursor) {
        VarDefSearchResult::FoundAt { offset, .. } => {
            let def_offset = find_offset(php, "$x)", 0);
            assert_eq!(offset, def_offset);
        }
        other => panic!(
            "Expected FoundAt, got {:?}",
            matches!(other, VarDefSearchResult::NotFound)
        ),
    }
}
