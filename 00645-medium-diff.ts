// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
	name: string;
	age: string;
};
type Bar = {
	name: string;
	age: string;
	gender: number;
};
type Coo = {
	name: string;
	gender: number;
};

type cases = [
	Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
	Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
	Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
	Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============
type D<T, U> = (T extends U ? never : T) | (U extends T ? never : U);

type Diff<T, U> = {
	[Key in D<keyof T, keyof U>]: Key extends keyof T
		? T[Key]
		: Key extends keyof U
		? U[Key]
		: never;
};
// type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>0
