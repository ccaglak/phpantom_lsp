<?php
// Source: Psalm SwitchTypeTest.php
// Auto-extracted by scripts/extract_psalm_tests.php
// Do not edit manually — re-run the extraction script instead.

// Test: switchBools
namespace PsalmTest_switch_type_1 {
    $x = false;
    $y = false;

    foreach ([1, 2, 3] as $v)  {
        switch($v) {
            case 3:
                $y = true;
                break;
            case 2:
                $x = true;
                break;
            default:
                break;
        }
    }

    assertType('bool', $x);
    assertType('bool', $y);
}

// Test: switchVarConditionalAssignment
namespace PsalmTest_switch_type_2 {
    switch (rand(0, 4)) {
        case 0:
            $b = 2;
            if (rand(0, 1)) {
                $a = false;
                break;
            }

        default:
            $a = true;
            $b = 1;
    }

    assertType('bool', $a);
    assertType('int', $b);
}

// Test: switchVarConditionalReAssignment
namespace PsalmTest_switch_type_3 {
    $a = false;
    switch (rand(0, 4)) {
        case 0:
            $b = 1;
            if (rand(0, 1)) {
                $a = false;
                break;
            }

        default:
            $a = true;
    }

    assertType('bool', $a);
}

