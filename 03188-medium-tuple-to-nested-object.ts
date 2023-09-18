// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
	Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
	Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
	Expect<
		Equal<
			TupleToNestedObject<["a", "b", "c"], boolean>,
			{ a: { b: { c: boolean } } }
		>
	>,
	Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];

// ============= Your Code Here =============

type Key = string | symbol | number;

type TupleToNestedObject<T extends unknown[], U> = T extends [
	infer A,
	...infer B
]
	? A extends Key
		? { [Key in A]: TupleToNestedObject<B, U> }
		: never
	: U;
