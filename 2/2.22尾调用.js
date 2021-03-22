// 在执行某个函数时，如果最后一步是一个函数调用，并且被调用函数的返回值直接被当前函数返回，就称为尾调用(tail call)
// function f() {
//   return g()
// }

// 递归时，如果函数调用本身是一个尾调用，则称之为尾递归
function fibonacci(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacci2(n, a = 0, b = 1) {
  console.log(n, a, b);
  if (n === 0) return 1
  if (n === 1) return b;
  return fibonacci(n - 1, b, a + b);
}
// let a = fibonacci2(1)
// let b = fibonacci2(2)
let c = fibonacci2(3)
console.log(c);
