let arr = [1, 2, 3, 4];
let newArr = arr.reduce((prev, cur) => {
  prev.indexOf(cur) === -1 && prev.push(cur);
  return prev;
}, []);


let compose = (...args) => x => args.reduceRight((res, cb) => cb(res), x);

/**
 * 简易版本缓存
 * @param func
 * @returns {function(*): *}
 */
let memoize0 = function (func) {
  let cache = {};
  let _memoize0 = function (key) {
    if (!cache[key]) cache[key] = func.apply(this, arguments);
    return cache[key]
  };
  return _memoize0;
};

/**
 * 针对每种函数做了cache
 * 需要返回每个执行的结果缓存起来return cache[address]
 * @param func
 * @param hasher
 * @returns {function(*): *}
 */
let memoize = function (func, hasher) {
  let _memoize;
  _memoize = function (key) {
    // console.log('key:', key);
    let cache = _memoize.cache;
    let address = '' - (hasher ? hasher.apply(this, arguments) : key);
    if (!cache[address]) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  _memoize.cache = {};
  return _memoize;
};

let count = 0
let fibonacci = function (n) {
  count++;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci = memoize0(fibonacci)

for (let i = 0; i <10 ; i--) {
  fibonacci(i)
}
console.log('count:', count);


