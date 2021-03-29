
/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1); // 例子co(gen,1,2,3),那么args是[1,2,3]

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    // 调用gen,args作为参数传入再赋值geigen，这里gen就变化了
    // gen称为了generator，有next方法，注意gen变化
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    // 不是generator，直接返回resolved的promise(这种情况再传入co的参数跟不是generator函数的情况下发生)
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    // 自动执行过程
    // 调用onFulfilled（） -> gen.next() -> next()
    // 生成promise -> promise决议后(假设resolved状态) -> then回调->onFulfilled

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res); //next遍历，ret的结构{value:xxx,done:xxx}
      } catch (e) {
        return reject(e); // 返回reject状态的promise
      }
      next(ret); //上次的遍历结果作为参数{value:xx, done:xx}
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      // 遍历完成,返回resolved状态的promise
      if (ret.done) return resolve(ret.value);
      // 这里是关键点之一 value变成promise value怎么转变的promise
      var value = toPromise.call(ctx, ret.value);
      // 这里是关键点之二 实现连续遍历
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
  if (!obj) return obj; //注意yield的值
  if (isPromise(obj)) return obj;
  // generator执行next的时候，几多是{done:xx, value:xx}，这里value是不是也可能是generator或者
  // 这里将新生成的generator或者generator函数作为参数进入co执行
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  // 普通function
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  // 这里要注意，fn不是普通函数，而是thunk函数
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

// objectToPromise为什么这么复杂，直接以对象为value返回resolved状态的promise不行吗
// 因为对象里可能包含promise，generator函数等
function objectToPromise(obj){
  // result与obj的构造器相同
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  // 遍历obj的key
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // 将每一个key对应的value变成promise
    var promise = toPromise.call(this, obj[key]);
    // 注意的范儿的作用
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  // 最后返回一个promsie，values是results，result是个对象，这个对象里面的obj的value生成的promise的value
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}
