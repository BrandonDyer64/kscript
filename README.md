# KScript

A pipelined, fully functional programming language that compiles to JavaScript

```js
; let Fibonacci = (a = 0, b = 1) => {
  if (_ == 0) {
    | a + b
  } else {
    | _ - 1
    Fibonacci(b, a + b)
  }
}

| 50
Fibonacci()
> console.log
```

KScript uses a flowing stack that "falls" through the program.

This:

```js
| X
Thing1
Thing2
Thing3(a)
```

Becomes this:

```js
X
  |> Thing1
  |> Thing2
  |> Thing3(a)
```

Compiles to this:

```js
let _;
_ = X
_ = Thing1(_)
_ = Thing2(_)
_ = Thing3(a)(_)
```

### Operators

```js
  -> Set + Eval
| -> Set
: -> Eval
; ->

x
_ = x(_)

| x
_ = x

: x
x(_)

; x
x
```

### Scoping

This:

```js
{
  a
  b
}
```

Compiles to this:

```js
_ = ( _ => {
  _ = a(_)
  _ = b(_)
  return _
})(_)
```

### Escaped scope

```js
| 1
{
  Add(2)
}
// : 3

| 1
; {
  Add(2)
}
// : 1

// And you can set a variable to the value of a scope
| 1
; let x = ({
  Add(2)
})(_)
// : 1
// x: 3
```

### Functions and Floating Scopes

```js
// Function
; let Add = (x) => {
  x +
}

// Floating scope
; let Add2 = {
  Add(2)
}

| 1
Add2
Add(3)
// : 6
```
