// Functional Programming:
//  * Immutability
//  * Pure functions
//  * Composition

/*
  Mutability === Bad
    Breaks equality (helps with caching)
    You can reason about when mutations occur
*/

let myArray = [1, 2, 3]

declare function mystery(x : any): void

mystery(myArray)

/*
  1. Does mystery modify myArray?
      Who knows
  2. Will mystery modify myArray in an hour from now after I forgot about it?
      Who knows
*/

// Note: This function is pure (mathematician's definition of "function")
declare function add(x : number, y : number): number

const p = add(3, 5)
const q = p

class BucketOfWords {
  constructor(public readonly words : string[], public readonly numberOfWords : number) {}
}

const bucket = new BucketOfWords(['hi', 'bye'], 2)