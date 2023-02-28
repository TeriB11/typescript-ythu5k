// Immutable Stack
// an ordered list of items that supports push and pop
//      like a stack of plates in a dinner
//      last in is the first out
//      first in is the last out

class MutableStack<T> {
  constructor(private elements : T[]) {}

  push(t : T): void {
    this.elements.push(t)
  }

  pop() : T {
    return this.elements.pop()
  }
}

// Major downside of immutable datastructures:
// * you can spend a lot more time mallocing and memcpying

class ImmutableStackFullCopy<T> {
  constructor(private elements : T[]) {}

  push(t : T): ImmutableStackFullCopy<T> {
    const newElements = [t, ...this.elements]
    return new ImmutableStackFullCopy(newElements)
  }

  pop() : [T | undefined, ImmutableStackFullCopy<T>] {
    const [head, ...tail] = this.elements
    return [head, new ImmutableStackFullCopy(tail)]
  }
}

// Persistent Data Structures
//   reuses major pertions of pre-mutated objects

class ImmutableStack<T> {
  constructor(private data: [head: T, tail: ImmutableStack<T>] | undefined) {}

  toString() {
    return this.data ? (this.data[0] + ' ' + this.data[1].toString()) : '<empty>'
  }

  static empty<T>() {
    return new ImmutableStack<T>(undefined)
  }

  push(t : T): ImmutableStack<T> {
    return new ImmutableStack([t, this])
  }

  pop() : [T | undefined, ImmutableStack<T>] {
    if (!this.data) {
      return [undefined, this]
    } else {
      return [this.data[0], this.data[1]]
    }
  }
}

const stack0 = ImmutableStack.empty<number>()
const stack1 = stack0.push(7)
const stack1_5 = stack1.push(9)
const stack2 = stack1_5.push(8)
const [value, stack3] = stack2.pop()

console.log(value + ' ;; ' + stack3.toString())

/*
  1. How do "auto-thread" the stack variable
  2. Monads & bind
  3. An entirely different way to write a stack...
*/

// Homework WTF?!

class FunctionalStack<T> {
  constructor(
    private onPop: (t : T | undefined, rest : FunctionalStack<T>) => void
  ) {}

  push(t : T) : FunctionalStack<T> {
    return null as any
  }

  pop(): [T | undefined, FunctionalStack<T>] {
    return null as any
  }
}
