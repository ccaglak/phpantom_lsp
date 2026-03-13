mod common;

use common::create_test_backend;
use tower_lsp::lsp_types::*;

fn get_folding_ranges(php: &str) -> Vec<FoldingRange> {
    let backend = create_test_backend();
    let uri = "file:///test.php";
    backend.update_ast(uri, php);
    backend.handle_folding_range(php).unwrap_or_default()
}

fn has_range(ranges: &[FoldingRange], start_line: u32, end_line: u32) -> bool {
    ranges
        .iter()
        .any(|r| r.start_line == start_line && r.end_line == end_line)
}

fn has_comment_range(ranges: &[FoldingRange], start_line: u32, end_line: u32) -> bool {
    ranges.iter().any(|r| {
        r.start_line == start_line
            && r.end_line == end_line
            && r.kind == Some(FoldingRangeKind::Comment)
    })
}

// ─── Basic cases ────────────────────────────────────────────────────────────

#[test]
fn empty_file_returns_empty() {
    let ranges = get_folding_ranges("<?php\n");
    assert!(ranges.is_empty());
}

#[test]
fn class_body_produces_range() {
    let php = r#"<?php
class Foo {
    public $bar;
    public $baz;
}
"#;
    let ranges = get_folding_ranges(php);
    // class body { on line 1, } on line 4
    assert!(
        has_range(&ranges, 1, 4),
        "Expected class body range (1..4), got: {ranges:?}"
    );
}

#[test]
fn method_body_produces_range() {
    let php = r#"<?php
class Foo {
    public function bar() {
        return 1;
    }
}
"#;
    let ranges = get_folding_ranges(php);
    // method body { on line 2, } on line 4
    assert!(
        has_range(&ranges, 2, 4),
        "Expected method body range (2..4), got: {ranges:?}"
    );
}

#[test]
fn function_body_produces_range() {
    let php = r#"<?php
function hello() {
    echo "hello";
    echo "world";
}
"#;
    let ranges = get_folding_ranges(php);
    // function body { on line 1, } on line 4
    assert!(
        has_range(&ranges, 1, 4),
        "Expected function body range (1..4), got: {ranges:?}"
    );
}

#[test]
fn nested_class_and_method_produce_two_ranges() {
    let php = r#"<?php
class Outer {
    public function inner() {
        return 42;
    }
}
"#;
    let ranges = get_folding_ranges(php);
    // class body: line 1..5
    assert!(
        has_range(&ranges, 1, 5),
        "Expected class body range (1..5), got: {ranges:?}"
    );
    // method body: line 2..4
    assert!(
        has_range(&ranges, 2, 4),
        "Expected method body range (2..4), got: {ranges:?}"
    );
}

// ─── Comments ───────────────────────────────────────────────────────────────

#[test]
fn doc_comment_produces_comment_range() {
    let php = r#"<?php
/**
 * This is a doc comment
 * spanning multiple lines.
 */
function foo() {}
"#;
    let ranges = get_folding_ranges(php);
    // doc comment starts line 1, ends line 4
    assert!(
        has_comment_range(&ranges, 1, 4),
        "Expected doc comment range (1..4), got: {ranges:?}"
    );
}

#[test]
fn consecutive_single_line_comments_produce_comment_range() {
    let php = r#"<?php
// line one
// line two
// line three
function foo() {}
"#;
    let ranges = get_folding_ranges(php);
    // Three consecutive // comments on lines 1, 2, 3
    assert!(
        has_comment_range(&ranges, 1, 3),
        "Expected consecutive comment range (1..3), got: {ranges:?}"
    );
}

#[test]
fn multi_line_block_comment_produces_comment_range() {
    let php = r#"<?php
/* This is
   a block
   comment */
function foo() {}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_comment_range(&ranges, 1, 3),
        "Expected block comment range (1..3), got: {ranges:?}"
    );
}

// ─── Control flow ───────────────────────────────────────────────────────────

#[test]
fn if_else_blocks_produce_ranges() {
    let php = r#"<?php
if ($x) {
    echo "a";
} else {
    echo "b";
}
"#;
    let ranges = get_folding_ranges(php);
    // if block { on line 1, } on line 3
    assert!(
        has_range(&ranges, 1, 3),
        "Expected if block range (1..3), got: {ranges:?}"
    );
    // else block { on line 3, } on line 5
    assert!(
        has_range(&ranges, 3, 5),
        "Expected else block range (3..5), got: {ranges:?}"
    );
}

#[test]
fn switch_body_produces_range() {
    let php = r#"<?php
switch ($x) {
    case 1:
        break;
    default:
        break;
}
"#;
    let ranges = get_folding_ranges(php);
    // switch body { on line 1, } on line 6
    assert!(
        has_range(&ranges, 1, 6),
        "Expected switch body range (1..6), got: {ranges:?}"
    );
}

#[test]
fn try_catch_finally_produce_ranges() {
    let php = r#"<?php
try {
    foo();
} catch (Exception $e) {
    bar();
} finally {
    baz();
}
"#;
    let ranges = get_folding_ranges(php);
    // try block: line 1..3
    assert!(
        has_range(&ranges, 1, 3),
        "Expected try block range (1..3), got: {ranges:?}"
    );
    // catch block: line 3..5
    assert!(
        has_range(&ranges, 3, 5),
        "Expected catch block range (3..5), got: {ranges:?}"
    );
    // finally block: line 5..7
    assert!(
        has_range(&ranges, 5, 7),
        "Expected finally block range (5..7), got: {ranges:?}"
    );
}

// ─── Loops ──────────────────────────────────────────────────────────────────

#[test]
fn for_loop_body_produces_range() {
    let php = r#"<?php
for ($i = 0; $i < 10; $i++) {
    echo $i;
}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 3),
        "Expected for loop body range (1..3), got: {ranges:?}"
    );
}

#[test]
fn foreach_loop_body_produces_range() {
    let php = r#"<?php
foreach ($items as $item) {
    echo $item;
}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 3),
        "Expected foreach loop body range (1..3), got: {ranges:?}"
    );
}

#[test]
fn while_loop_body_produces_range() {
    let php = r#"<?php
while ($x > 0) {
    $x--;
}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 3),
        "Expected while loop body range (1..3), got: {ranges:?}"
    );
}

#[test]
fn do_while_body_produces_range() {
    let php = r#"<?php
do {
    $x++;
} while ($x < 10);
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 3),
        "Expected do-while body range (1..3), got: {ranges:?}"
    );
}

// ─── Arrays ─────────────────────────────────────────────────────────────────

#[test]
fn multi_line_array_produces_range() {
    let php = r#"<?php
$arr = [
    'a',
    'b',
    'c',
];
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 5),
        "Expected array range (1..5), got: {ranges:?}"
    );
}

#[test]
fn single_line_array_no_range() {
    let php = "<?php\n$arr = ['a', 'b', 'c'];\n";
    let ranges = get_folding_ranges(php);
    // The array is single-line, so no folding range should be emitted for it.
    // There might still be no ranges at all.
    for r in &ranges {
        // Any range that exists should not be single-line and not be an
        // array on line 1.
        assert!(
            r.start_line != r.end_line,
            "Single-line range should have been filtered: {r:?}"
        );
    }
}

// ─── Enums ──────────────────────────────────────────────────────────────────

#[test]
fn enum_body_produces_range() {
    let php = r#"<?php
enum Color {
    case Red;
    case Green;
    case Blue;
}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 5),
        "Expected enum body range (1..5), got: {ranges:?}"
    );
}

#[test]
fn backed_enum_produces_range() {
    let php = r#"<?php
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';
}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 4),
        "Expected backed enum body range (1..4), got: {ranges:?}"
    );
}

// ─── Interfaces and traits ──────────────────────────────────────────────────

#[test]
fn interface_body_produces_range() {
    let php = r#"<?php
interface Foo {
    public function bar(): void;
    public function baz(): int;
}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 4),
        "Expected interface body range (1..4), got: {ranges:?}"
    );
}

#[test]
fn trait_body_produces_range() {
    let php = r#"<?php
trait Foo {
    public function bar() {
        return 1;
    }
}
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 5),
        "Expected trait body range (1..5), got: {ranges:?}"
    );
}

// ─── Closures ───────────────────────────────────────────────────────────────

#[test]
fn multi_line_closure_produces_range() {
    let php = r#"<?php
$fn = function ($x) {
    return $x + 1;
};
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 3),
        "Expected closure body range (1..3), got: {ranges:?}"
    );
}

#[test]
fn single_line_closure_no_range() {
    let php = "<?php\n$fn = function ($x) { return $x + 1; };\n";
    let ranges = get_folding_ranges(php);
    for r in &ranges {
        assert!(
            r.start_line != r.end_line,
            "Single-line range should have been filtered: {r:?}"
        );
    }
}

// ─── Match expression ───────────────────────────────────────────────────────

#[test]
fn match_expression_produces_range() {
    let php = r#"<?php
$result = match ($x) {
    1 => 'one',
    2 => 'two',
    default => 'other',
};
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 5),
        "Expected match expression range (1..5), got: {ranges:?}"
    );
}

// ─── Argument and parameter lists ───────────────────────────────────────────

#[test]
fn multi_line_argument_list_produces_range() {
    let php = r#"<?php
foo(
    $a,
    $b,
    $c
);
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 5),
        "Expected argument list range (1..5), got: {ranges:?}"
    );
}

#[test]
fn multi_line_parameter_list_produces_range() {
    let php = r#"<?php
function foo(
    int $a,
    string $b,
    bool $c
) {
    return $a;
}
"#;
    let ranges = get_folding_ranges(php);
    // Parameter list: line 1..5
    assert!(
        has_range(&ranges, 1, 5),
        "Expected parameter list range (1..5), got: {ranges:?}"
    );
    // Function body: line 5..7
    assert!(
        has_range(&ranges, 5, 7),
        "Expected function body range (5..7), got: {ranges:?}"
    );
}

// ─── Single-line constructs ─────────────────────────────────────────────────

#[test]
fn single_line_constructs_produce_no_range() {
    let php = "<?php\nif (true) { echo 1; }\n";
    let ranges = get_folding_ranges(php);
    for r in &ranges {
        assert!(
            r.start_line != r.end_line,
            "Single-line range should have been filtered: {r:?}"
        );
    }
}

// ─── Namespace ──────────────────────────────────────────────────────────────

#[test]
fn brace_delimited_namespace_produces_range() {
    let php = r#"<?php
namespace App {
    class Foo {
    }
}
"#;
    let ranges = get_folding_ranges(php);
    // namespace body: line 1..4
    assert!(
        has_range(&ranges, 1, 4),
        "Expected namespace body range (1..4), got: {ranges:?}"
    );
}

// ─── Sorting and deduplication ──────────────────────────────────────────────

#[test]
fn ranges_are_sorted_by_start_line() {
    let php = r#"<?php
function a() {
    return 1;
}
function b() {
    return 2;
}
"#;
    let ranges = get_folding_ranges(php);
    for w in ranges.windows(2) {
        assert!(
            w[0].start_line <= w[1].start_line,
            "Ranges not sorted: {:?} came before {:?}",
            w[0],
            w[1]
        );
    }
}

// ─── Complex nesting ────────────────────────────────────────────────────────

#[test]
fn complex_nesting_produces_all_expected_ranges() {
    let php = r#"<?php
class Service {
    /**
     * Handle the request.
     */
    public function handle() {
        if ($this->check()) {
            foreach ($this->items() as $item) {
                try {
                    $item->process();
                } catch (\Exception $e) {
                    log($e);
                }
            }
        }
    }
}
"#;
    let ranges = get_folding_ranges(php);
    // class body
    assert!(has_range(&ranges, 1, 16), "class body: {ranges:?}");
    // doc comment
    assert!(has_comment_range(&ranges, 2, 4), "doc comment: {ranges:?}");
    // method body
    assert!(has_range(&ranges, 5, 15), "method body: {ranges:?}");
    // if block
    assert!(has_range(&ranges, 6, 14), "if block: {ranges:?}");
    // foreach block
    assert!(has_range(&ranges, 7, 13), "foreach block: {ranges:?}");
    // try block
    assert!(has_range(&ranges, 8, 10), "try block: {ranges:?}");
    // catch block
    assert!(has_range(&ranges, 10, 12), "catch block: {ranges:?}");
}

// ─── Anonymous class ────────────────────────────────────────────────────────

#[test]
fn anonymous_class_body_produces_range() {
    let php = r#"<?php
$obj = new class {
    public function foo() {
        return 1;
    }
};
"#;
    let ranges = get_folding_ranges(php);
    // anonymous class body: line 1..5
    assert!(
        has_range(&ranges, 1, 5),
        "Expected anonymous class body range (1..5), got: {ranges:?}"
    );
    // method body: line 2..4
    assert!(
        has_range(&ranges, 2, 4),
        "Expected method body range (2..4), got: {ranges:?}"
    );
}

// ─── Legacy array ───────────────────────────────────────────────────────────

#[test]
fn multi_line_legacy_array_produces_range() {
    let php = r#"<?php
$arr = array(
    'a',
    'b',
    'c',
);
"#;
    let ranges = get_folding_ranges(php);
    assert!(
        has_range(&ranges, 1, 5),
        "Expected legacy array range (1..5), got: {ranges:?}"
    );
}
