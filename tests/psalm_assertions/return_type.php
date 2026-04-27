<?php
// Source: Psalm ReturnTypeTest.php
// Auto-extracted by scripts/extract_psalm_tests.php
// Do not edit manually — re-run the extraction script instead.

// Test: extendsStaticCallReturnType
namespace PsalmTest_return_type_1 {
    /**
     * @psalm-consistent-constructor
     */
    abstract class A {
        /** @return static */
        public static function load() {
            return new static();
        }
    }

    class B extends A {
    }

    $b = B::load();

    assertType('B', $b);
}

// Test: extendsStaticCallArrayReturnType
namespace PsalmTest_return_type_2 {
    /**
     * @psalm-consistent-constructor
     */
    abstract class A {
        /** @return array<int,static> */
        public static function loadMultiple() {
            return [new static()];
        }
    }

    class B extends A {
    }

    $bees = B::loadMultiple();

    assertType('array<int, B>', $bees); // SKIP — static return type not substituted in array generic
}

// Test: overrideReturnType
namespace PsalmTest_return_type_3 {
    class A {
        /** @return string|null */
        public function blah() {
            return rand(0, 10) === 4 ? "blah" : null;
        }
    }

    class B extends A {
        /** @return string */
        public function blah() {
            return "blah";
        }
    }

    $blah = (new B())->blah();

    assertType('string', $blah); // SKIP — overridden return type not resolved through child class
}

// Test: interfaceReturnType
namespace PsalmTest_return_type_4 {
    interface A {
        /** @return string|null */
        public function blah();
    }

    class B implements A {
        /** @return string|null */
        public function blah() {
            return rand(0, 10) === 4 ? "blah" : null;
        }
    }

    $blah = (new B())->blah();

    assertType('null|string', $blah); // SKIP — interface method return type not resolved on implementing class
}

// Test: overrideReturnTypeInGrandparent
namespace PsalmTest_return_type_5 {
    abstract class A {
        /** @return string|null */
        abstract public function blah();
    }

    abstract class B extends A {
    }

    class C extends B {
        /** @return string|null */
        public function blah() {
            return rand(0, 10) === 4 ? "blahblah" : null;
        }
    }

    $blah = (new C())->blah();

    assertType('null|string', $blah);
}

// Test: infersArrowClosureReturnTypes
// Requires PHP 7.4
namespace PsalmTest_return_type_6 {
    /**
     * @param Closure(int, int): bool $op
     * @return Closure(int): bool
     */
    function reflexive(Closure $op): Closure {
        return fn ($x) => $op($x, $x);
    }

    $res = reflexive(fn(int $a, int $b): bool => $a === $b);

    assertType('Closure(int):bool', $res); // SKIP — arrow closure return type inference not supported
}

// Test: infersObjectShapeOfCastScalar
namespace PsalmTest_return_type_7 {
    function returnsInt(): int {
        return 1;
    }

    $obj = (object)returnsInt();

    assertType('object{scalar:int}', $obj); // SKIP — object cast of scalar not inferred as object shape
}

// Test: infersObjectShapeOfCastArray
namespace PsalmTest_return_type_8 {
    /**
     * @return array{a:1}
     */
    function returnsArray(): array {
        return ["a" => 1];
    }

    $obj = (object)returnsArray();

    assertType('object{a:int}', $obj); // SKIP — object cast of array not inferred as object shape
}

