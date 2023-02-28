// Functions as data

// 1. Put a function in a variable (or in a list, object, class, etc)
const double = (n : number) => 2*n
const listOfFunctions = [double, (n : number) => 3*n]

// 2. Pass a function as an argument
function applyNumberFunction(a : number, fn : (n : number) => number) {
  return fn(a)
}

function applyFunction<A, B>(a : A, fn : (n : A) => B): B {
  return fn(a)
}

// console.log(applyFunction('hello', s => s.length))

// 3. Return a function from a function

function myFavoriteFunction(): (n : number) => number {
  return double
}

function makeMultiplier(m : number): (n : number) => number {
  return (n : number) => m*n
}

// (m: number) => (n: number) => number
const tripler = makeMultiplier(3)
const twelve = makeMultiplier(3)(4) // multiply(3, 4)

// Currying (named after Haskell Curry)

function curryNumber(
  f : (a : number, b : number) => number
): (a : number) => (b : number) => number {
  return (a : number) => (b : number) => f(a, b)
}

function curry<A, B extends any[], C>(
  f : (a : A, ...b : B) => C
): (a : A) => (...b : B) => C {
  return (a : A) => (...b : B) => f(a, ...b)
}

const subtract = (u : number, v : number) => u - v

const x_0 = subtract(10, 6)
const x_1 = curry(subtract)(10)(6)

const threeDigitNumber =
  (a : number, b : number, c : number) => 100*a + 10*b + c

const b = curry(threeDigitNumber)

// Homework #1 implement curryAll
// which takes an (A, B, C, D) => E
// and creates (A) => (B) => (C) => (D) => E

// Homework #2 implement uncurry
declare function uncurry<A, B extends any[], C>(
  f : (a : A) => (...b : B) => C
): (a : A, ...b : B) => C

// Homework #3 implement uncurryAll
