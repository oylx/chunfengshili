(function (root) {
  var _ = function (obj) {
    // 调用2次,this一开始为Window,然后return new _()返回_的实例,此时this为_
    if (!(this instanceof _)) {
      return new _(obj);
    }
    this.wrap = obj;
  };

  _.map = function () {
    console.log(1);
  };
  _.prototype.map = () => {
    console.log(2);
  };

  _.unique = function (array, callback) {
    debugger
    let result = [], i = 0;
    for (; i < array.length; i++) {
      let target = callback ? callback(array[i]) : array[i];
      result.indexOf(target) === -1 && result.push(target);
    }
    return result;
  };

  _.each = function (array, callback) {
    let i = 0;
    for (; i < array.length; i++) {
      callback.call(array, array[i]);
    }
  };

  _.chain = (obj) => {
    const instance = _(obj); // 特殊的实例对象
    instance._chain = true; // 特殊的属性 凭证
    return instance;
  };

  const result = (instance, obj) => {
    if (instance._chain) {
      instance.wrap = obj;
      return instance;
    }
    return obj;
  };

  _.prototype.value = () => {
    return this.wrap;
  };

  _.functions = function (obj) {
    var result = [];
    for (var key in obj) {
      result.push(key);
    }
    return result;
  };

  // 1.找到 _ 静态属性[map,unique,...], 2:遍历数组 _.prototype[item] item?map:unique
  _.mixin = function (obj) {
    _.each(_.functions(obj), function (key) {
      let func = obj[key];
      // 支持_().map()与_.map()调用函数一致问题，即不需要单独写_.prototype.map，因为_()返回的是_的new实例,_是window._
      // 即用到_().map || _([1,2,3,4]).map()才会用到
      _.prototype[key] = function () {
        // _([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 'a', 'A']).unique()
        // this.wrap:[1,2,3,4]
        let args = [this.wrap];
        // arguments可以0至多个参数
        [].push.apply(args, arguments);

        // this判断是否需要链式调用 this._chain === true
        // func.apply(this, args) 数据经过某个供需处理之后的结果
        return result(this, func.apply(this, args));
      };
    });
  };

  _.mixin(_);
  // 初始化root === Window
  root._ = _;
})(this);
