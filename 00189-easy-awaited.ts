// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
	Expect<Equal<MyAwaited<X>, string>>,
	Expect<Equal<MyAwaited<Y>, { field: number }>>,
	Expect<Equal<MyAwaited<Z>, string | number>>,
	Expect<Equal<MyAwaited<Z1>, string | boolean>>,
	Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

type Thenable<T> = { then: (onfulfilled: (arg: T) => unknown) => unknown };

// ============= Your Code Here =============
type SoftAwaited<T> = T extends Promise<infer A> | Thenable<infer A>
	? SoftAwaited<A>
	: T;

type MyAwaited<T extends Promise<unknown> | Thenable<unknown>> = T extends
	| Promise<infer A>
	| Thenable<infer A>
	? SoftAwaited<A>
	: T;
