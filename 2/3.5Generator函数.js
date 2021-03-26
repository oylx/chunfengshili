function createIterator(items) {
  let i = 0;
  return {
    next: function () {
      let done = i >= items.length;
      let value = !done ? items[i++] : undefined;
      return {
        done,
        value,
      };
    },
  };
}

function runG0() {
  let g0 = createIterator([1, 2, 3]);
  console.log(g0.next());
  console.log(g0.next());
  console.log(g0.next());
  console.log(g0.next());
}

/**
 * next执行
 *  遇到yield暂停，将紧跟yield表达式的值作为返回对象的value
 *  没有yield，一直执行到return，将return的值作为返回对象的value
 *  没有return，将undefin作为返回对象的value
 * next参数
 *  next参数可以带一个参数，会被当作上一个yield表达式的返回值
 * @returns {Generator<number|*, void, *>}
 */
function * createIterator1() {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3;
  console.log('first:', first); // 4赋值给first
  console.log('second:', second); // 5赋值给second
}

function runG1() {
  let g1 = createIterator1();
  console.log(g1.next()); // {value: 1, done: false}
  console.log(g1.next(4)); // {value: 6, done: false}
  console.log(g1.next(5)); // {value: 8, done: false}
  console.log(g1.next(9)); // {value: undefined, done: true}
}

function * generator1() {
  yield 1;
  yield 2;
  yield 3;
}

function * generator2() {
  yield 100;
  yield * generator1();
  yield 200;
}

function runG2() {
  let g2 = generator2();
  console.log('g2:');
  console.log(g2.next()); // { value:100, done: false}
  console.log(g2.next()); // { value:1,done: false}
  console.log(g2.next()); // { value:2, done: false}
  console.log(g2.next()); // { value:3, done: false}
  console.log(g2.next()); // { value:200, done: false}
  console.log(g2.next()); // { value:undefined, done: false}
  console.log(g2.next()); // { value:undefined, done: false}
}

function runG3() {
  let g3 = generator1();
  console.log('g3:');
  console.log(g3.next());
  console.log(g3.return());
  console.log(g3.next());
}

function * createIterator2() {
  let first = yield 1;
  let second;
  try {
    second = yield first + 2;
  } catch (e) {
    second = 6;
  }
  yield second + 3;
}

function runG4() {
  let g4 = createIterator2();
  console.log('g4:');
  console.log(g4.next());
  console.log(g4.next(10));
  console.log(g4.throw(new Error('error'))); // 执行try catch里面的catch，遇到yield停下来
  console.log(g4.next());
}

function testCallBack(a, cb) {
  console.log(a);
  cb('callback');
}

function cb(str) {
  console.log(str);
}

const Thunk = function (fn) {
  // 返回一个函数,testThunk('hi')
  return function (...args) {
    // 入参只有一个callback函数
    return function (callback) {
      fn.call(this, ...args, callback);
    };
  };
};

// 转换为testThunk
const testThunk = Thunk(testCallBack);

// 调用
testThunk('hi')(cb);

function * gen() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

function runG5() {
  const g5 = gen();
  let res = g5.next();
  while (!res.done) {
    console.log(res.value);
    res = g5.next();
  }
}

/**
 * Thunk函数真正的威⼒,在于可以⾃动执⾏Generator函数
 * generator 函数自动执行器
 function run(fn) {
 * @param fn
 */
function runG6(fn) {
  const g6 = fn();
  // result.value就是testThunk('a')执行后的function，类似testThunk('hi')(cb)中到testThunk('hi')这一步
  // next 就是本身function next,当于上面的cb
  // 只有result.value(next)后，testCallBack和cb才会调用
  function next1() {
    const result = g6.next();
    console.log('log', result);
    if (result.done) return;
    result.value(next1);
  }
  next1();
}

/**
 * 有了这个执⾏器,执⾏Generator函数⽅便多了,不管内部有多少个异步操作,直接把Generator函数传⼊ run 函数即可
 * 当然,前提是每⼀个异步操作都要是Thunk函数,也就是说,跟在 yield 命令后⾯的必须是Thunk函数。因为需要传入回调函数
 * @returns {Generator<function(*=): void, function(*=): void, *>}
 */
function* g() {
  yield testThunk('a');
  yield testThunk('aa');
  return testThunk('aaa');
}

runG6(g);



