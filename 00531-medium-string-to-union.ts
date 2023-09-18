// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
	Expect<Equal<StringToUnion<"">, never>>,
	Expect<Equal<StringToUnion<"t">, "t">>,
	Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
	Expect<
		Equal<
			StringToUnion<"coronavirus">,
			"c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
		>
	>
];

// ============= Your Code Here =============
type StringToArray<S extends string> = S extends `${infer Head}${infer Tail}`
	? [Head, ...StringToArray<Tail>]
	: [];

type TupleToUnion<T extends unknown[] | readonly unknown[]> = T extends [
	infer A,
	...infer B
]
	? A | TupleToUnion<B>
	: never;

type StringToUnion<T extends string> = TupleToUnion<StringToArray<T>>;
