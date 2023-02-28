type Monoid<T> = {
  get empty(): T
  append(a : T, b : T): T 
  // append(a, empty) = a
  // append(empty, a) = a
  // append(a, append(b, c)) = append(append(a, b), c)
}

// The things that can be "reduced" are Foldables (which are "kind of" Traversable Monoids)

/*
  Functions are a monoid:
  empty : id
  append composition
*/

function functionMonoid<T>(): Monoid<(t: T) => T> {
  return {
    empty : t => t,
    append : (ab, bc) => (t : T) => bc(ab(t))
  }
}

const numberAdditionMonoid : Monoid<number> = {
  empty: 0,
  append: (a, b) => a + b
}

// "Monoid Laws"

const stringCaoncatMonoid : Monoid<string> = {
  empty : '',
  append:  (a, b) => a + b
}

// NOT A MONOID
const sillyMonoid : Monoid<string> = {
  empty : '456',
  append: (a, b) => a
}

// A Functor is a Type Constructor
// that can be mapped over

type Optional<T> = T | undefined

declare function arryMap<T, S>    (arr : Array<T>,    f : (t : T) => S) : Array<S>
declare function optionalMap<T, S>(arr : Optional<T>, f : (t : T) => S) : Optional<S>
declare function promiseMap<T, S> (arr : Promise<T>,  f : (t : T) => S) : Promise<S>

// A Type Constructor (such as 'Array') that has the 'map' function is a Functor

[1, 2, 3].map(x => x > 2); // [false, false, true]

// Functor Laws:

[1, 2, 3].map(x => x > 2).map(b => b.toString()); // ["false", "false", "true"]
[1, 2, 3].map(x => (x > 2).toString()); // ["false", "false", "true"]

const anArray = [1, 2, 3];
const functionA = (x : number) => x > 2
const functionB = (b : boolean) => b.toString()

// number[]   boolean[]       string[]
anArray.map(functionA).map(functionB);
anArray.map(x => functionB(functionA(x)));

// Functor laws:
// f.map(a).map(b) === f.map(b . a)
// f.map(id).map(b) === f.map(b)
// f.map(a).map(id) === f.map(a)

// Mapping - "Functor"

declare function treeMap_<A, B>(this : Tree<A>, fn : (a : A) => B): Tree<B>

// Let's swap the order of the args:

declare function treeMap<A, B>(fn : (a : A) => B, tree : Tree<A>): Tree<B>

// Let's now curry this function

declare function treeMapCurried<A, B>(
  fn : (a : A) => B
): (tree : Tree<A>) => Tree<B>
