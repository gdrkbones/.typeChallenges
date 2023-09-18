// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
	Expect<
		Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
	>,
	Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
	Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
	Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
	Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
	Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
	Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
	Expect<
		Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
	>,
	Expect<Equal<AnyOf<[0, "", false, [], {}, undefined, null]>, false>>,
	Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============
type Falsy = 0 | "" | false | [] | undefined | null;

type AnyOf<T extends readonly any[]> = T extends [infer A, ...infer B]
	? A extends Falsy
		? AnyOf<B>
		: // check if is an object
		A extends Record<string | number | symbol, unknown>
		? // then check for its keys to be empty
		  [keyof A] extends [never]
			? AnyOf<B>
			: true
		: true
	: false;

// type Test = 1 extends {} ? true : false;
