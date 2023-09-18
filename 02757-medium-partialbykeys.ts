// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface User {
	name: string;
	age: number;
	address: string;
}

interface UserPartialName {
	name?: string;
	age: number;
	address: string;
}

interface UserPartialNameAndAge {
	name?: string;
	age?: number;
	address: string;
}

type cases = [
	Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
	Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
	Expect<Equal<PartialByKeys<User>, Partial<User>>>,
	// @ts-expect-error
	Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>
];

// ============= Your Code Here =============

type PartialByKeys<T, K extends keyof T = keyof T> = Omit<
	{
		[P in keyof T as P extends K ? P : never]?: T[P];
	} & {
		[P in Exclude<keyof T, K>]: T[P];
	},
	never
>;
