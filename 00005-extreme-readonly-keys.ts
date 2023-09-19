// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
	Expect<Equal<"title", GetReadonlyKeys<Todo1>>>,
	Expect<Equal<"title" | "description", GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
	readonly title: string;
	description: string;
	completed: boolean;
}

interface Todo2 {
	readonly title: string;
	readonly description: string;
	completed?: boolean;
}

// ============= Your Code Here =============

type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type EqualByParam<T, K extends keyof T> = Equal<
	Pick<T, K>,
	MyReadonly<Pick<T, K>>
>;

type GetReadonlyKeys<T> = keyof {
	[K in keyof T as EqualByParam<T, K> extends true ? K : never]: T[K];
};

type test = GetReadonlyKeys<Todo2>;
