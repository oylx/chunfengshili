const fs = require('fs');
const Thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    };
  };
};
const readFileThunk = Thunk(fs.readFile);

function run(fn) {
  const gen = fn();
  // result.value就是readFileThunk('./img/1.png')执行后的function，类似testThunk('hi')(cb)中到testThunk('hi')这一步
  // next 就是本身function next,类似testThunk('hi')(cb)的cb,但是readFile的cb有参数err,data
  // 只有result.value(next)后，testCallBack和cb才会调用
  function next(err, data) {
    const res = gen.next(data);
    if (res.done) {
      return;
    }
    res.value(next);
  }

  next();
}

const g = function * () {
  const s1 = yield readFileThunk('./img/1.png');
  const s2 = yield readFileThunk('./img/2.png');
  const s3 = yield readFileThunk('./img/3.png');
};

run(g);
