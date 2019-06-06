# kscript

A pipelined, fully functional programming language that compiles to JavaScript

```js
; let Sum = (total = 0) => {
  if (.length > 0) {
    Sum(total + _.pop())
  } else {
    | total
  }
}

| [ 1, 2, 3, 4, 5 ]
Sum()
print

; let Fibonacci = (a = 0, b = 1) => {
  if (== 0) {
    | a + b
  } else {
    | _ - 1
    Fibonacci(b, a + b)
  }
}

| 50
Fibonacci()
console.log
```
