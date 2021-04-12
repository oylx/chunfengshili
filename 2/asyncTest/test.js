function task1() {
  // 打印内容
  // 宏任务:宏任务1.1
  // 微任务:微任务1.1 微任务1.2
  // 打印: 1 3 7 9 0 2 8 4 5 6
  async function async1() {
    console.log('1');

    // async的返回值是promise
    // 微任务1.1
    console.log(await async2());
    console.log('2');

    // 等价于 async2生成的promise立即执行，console.log('3)
    // const promise = new Promise((resolve) => {
    //   console.log(3);
    //   resolve(0)
    // }).then(a2 => {
    //   console.log(a2);
    //   console.log('2');
    // })

    // 或者可以这么理解
    // const a2 = await async2() //promise立即执行
    // a2.then(() => {
    //   console.log(a2);
    //   console.log(2);
    // })
  }

  async function async2() {
    console.log(3);
    return '0';
  }

  // 宏任务1.1
  setTimeout(function () {
    console.log('4');
    new Promise(function (resolve) {
      console.log(5);
      resolve();
    }).then(function () {
      console.log('6');
    });
  });

  // await async1();  //有await就是一个异步执行,会阻塞下面的，但本身还是立马执行
  async1(); // 没有await就是一个同步执行

  new Promise(function (resolve) {
    console.log('7');
    resolve();
  }).then(function () {
    // 微任务1.2
    console.log('8');
  });

  console.log('9');
}

// task1()

// 习题2
// 解释浏览器的eventLoop机制
// 1.解释eventLoop是什么，解决什么问题
// 2.解释实现机制，线程和任务队列，任务队列怎么更新的，然后解释宏任务/微任务的执行,要把loop循环的过程解释出来

// 习题3请问以下代码输出什么？考察then方法的参数不是函数的情况
// 解释：
// const promise1 = this;
// const promise2 = new P(() => {});
// if (!isFunction(onFulFilled)) {
//   return promise1;
// }
// Promise.resolve('a').then('b') // 'b'不符合function
// console.log(c instanceof Promise); // true
// const c = Promise.resolve('c') // 返回的是promise，也不符合isFunction(onFulFilled)
function task3() {
  Promise.resolve('a').then('b').then(Promise.resolve('c')).then(console.log);
}

// task3()

// 习题4:输出什么 resolve一个不规范的thenable的情况
// then缺少onFulfilled onRejected，都是function,不能决议状态，一直pending状态
function task4() {
  Promise.resolve({
    then: function () {
      console.log('x');
    },
  }).then(() => {
    console.log('y');
  });
}

// task4()

// 习题5:输出什么 resolve一个规范的thenable情况
function task5() {
  Promise.resolve({
    then: function (fullfill) {
      fullfill('a');
      console.log('b'); // 同步代码先执行
      throw new Error('c'); //不会执行，上面的fulfill改变了状态为onRejected,状态只能变化一次
      console.log('d');
    },
  }).then(d => console.log(d), error => console.log(error));
}

// task5();

// 习题6 请问会输出什么 promise的错误处理
function task6() {
  Promise.resolve(3).then(() => {
    console.log('a');
    throw new Error('b');
  }).then(() => {
    console.log('c');
  }, (e) => {
    console.log(e.message);
    return 'd';
  }).then(d => console.log(d), e => {
    console.log(e);
  });
}

// task6();

// 习题7 Promise在resolve语句后抛出错误能否被捕获
// 不能 resolve将状态置为resolved，不能再变为rejected
function task7() {
  new Promise(function (resolve, reject) {
    resolve('a');
    throw  new Error('b');
  }).then(console.log).catch(console.log);
}

// task7();

// 习题8 请根据以下代码，用 promise 实现顺序加载图片，如果有图片加载失败，在图片位置现实加载失败的提示
// 见test.html

// 习题9
function * gen9() {
  const a = yield 'a';
  const b = yield a + 2;
  console.log('a', a);
  return b;
}

function runGen() {
  const g = gen9();
  console.log(g.next());
  console.log(g.next(4));
  console.log(g.next());
}

// runGen();

// 习题10 请问以下代码会打印什么
function * gen1() {
  yield 'a';
  yield 'b';
}

function * gen2() {
  yield * gen1();
  yield 'c';
  yield 'd';
}

function * gen3() {
  gen1();
  yield 'e';
  yield 'f';
}

function runGenAll() {
  const g2 = gen2();
  const g3 = gen3();

  for (let v of g2) {
    console.log(v);
  }
  for (let v of g3) {
    console.log(v);
  }

}

// runGenAll();

// 习题11 请问以下代码会输出什么 生成器结合promise
function geneP(d1, d2) {
  return new Promise((resolve, reject) => {
    if (+new Date() > 0) {
      resolve(d1);
    } else {
      reject(d2);
    }
  });
}

function * gen10() {
  yield geneP('yes', 'no');
  yield geneP('y', 'n');
}

function runGen10(fn) {
  const g = fn();

  function next() {
    const result = g.next();
    console.log(result.value);
    if (result.done) {
      return;
    }
    result.value.then(next);
  }

  next();
}

runGen10(gen10)


