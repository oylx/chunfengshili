// 3秒之后亮一次红灯，再过2秒亮一次绿灯，再过1秒亮一次黄灯,用promise实现多次交替亮灯灯效果
// console.log模拟亮灯

function light(color, second) {

}

const statusMap = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

function fulfilledPromise(promise, value) {
  if (promise.status !== statusMap.PENDING) {
    return;
  }
  promise.status = statusMap.FULFILLED;
  promise.reason = value;
  runCbs(promise.fulfilledCallbacks, value);
}

function rejectedPromise(promise, reason) {
  if (promise.status !== statusMap.PENDING) {
    return;
  }
  promise.status = statusMap.FULFILLED;
  promise.reason = reason;
  runCbs(promise.rejectedCallbacks, reason);
}

function isFunction(fn) {
  return Object.prototype.toString.call(fn).toLocaleLowerCase() === '[object function]';
}

function runCbs(cbs, value) {
  cbs.forEach(cb => cb(value));
}

function isPromise(p) {
  return p instanceof P;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj).toLocaleLowerCase() === '[object object]';
}

// promise解析
function resolvePromise(promise, x) {
  // x与promise相同
  if (promise === x) {
    rejectedPromise(promise, new TypeError('cant be same'));
    return;
  }
  // x是promise
  if (isPromise(x)) {
    if (x.status === statusMap.FULFILLED) {
      resolvePromise(promise, x.value);
    }
    if (x.status === statusMap.REJECTED) {
      rejectedPromise(promise, x.value);
    }
    if (x.status === statusMap.PENDING) {
      x.then(() => {
        fulfilledPromise(promise, x.value);
      }, () => {
        rejectedPromise(promise, x.reason);
      });
    }
    return;
  }
  // x是对象或者函数
  if (isObject(x) || isFunction(x)) {
    let then;
    let called = false;
    try {
      then = x.then;
    } catch (error) {
      rejectedPromise(promise, error);
      return;
    }
    if (isFunction(then)) {
      try {
        then.call(x, (y) => {
          if (called) {
            return;
          }
          resolvePromise(promise, y);
        }, (r) => {
          if (called) {
            return;
          }
          rejectedPromise(promise, r);
        });
      } catch (error) {
        if (called) {
          return;
        }
        called = true;
        rejectedPromise(promise, error);
      }
      return;
    }
    // x不是对象或者函数
  } else {
    fulfilledPromise(promise, x)
  }
}

class P {
  constructor(fn) {
    this.status = statusMap.PENDING;
    this.reason = undefined;
    this.value = undefined;
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];
    fn((value) => {
      fulfilledPromise(this, value);
    }, (reason) => {
      rejectedPromise(this, reason);
    });
  }

  //2个参数
  then(onFulFilled, onRejected) {
    const promise1 = this;
    const promise2 = new P(() => {});
    if (promise1.status === statusMap.FULFILLED) {
      if (!isFunction(onFulFilled)) {
        return promise1;
      }
      setTimeout(() => {
        try {
          const x = onFulFilled(promise1.value);
          resolvePromise(promise2, x);
        } catch (error) {
          rejectedPromise(promise2, error);
        }

      }, 0);
    }
    if (promise1.status === statusMap.REJECTED) {
      if (!isFunction(fn)) {
        return promise2;
      }
      setTimeout(() => {
        try {
          const x = onRejected(promise1.value);
          rejectedPromise(promise2, x);
        } catch (error) {
          rejectedPromise(promise2, error);
        }
      }, 0);
    }

    if (promise1.status === statusMap.PENDING) {
      promise1.fulfilledCallbacks.push(() =>{
        setTimeout(() => {
          try {
            const x = onFulFilled(promise1.value);
            resolvePromise(promise2, x);
          } catch (error) {
            rejectedPromise(promise2, error);
          }
        }, 0)
      });
      promise1.rejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onFulFilled(promise1.value);
            resolvePromise(promise2, x);
          } catch (error) {
            rejectedPromise(promise2, error);
          }
        }, 0)
      });
    }

    return promise2
  }
}

const p = new P((v) => {
  console.log(v);
});
