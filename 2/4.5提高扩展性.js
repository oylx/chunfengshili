/**
 * 观察者模式
 * 定义一个中转观察者，两个模块不直接沟通，而是通过观察者
 * 一般适用于不方便直接沟通，或者异步操作
 */
function observe() {
  this.message = {};
}

observe.prototype.register = function (type, fn) {
  this.message[type] = fn;
};
observe.prototype.fire = function (type) {
  this.message[type]();
};
observe.prototype.remove = function (type) {
  this.message[type] = null;
};

/**
 * 多人合作问题：A写了首页模块，B写了评论模块，现在要把评论模块展示在首页模块
 */
function commentAndIndex() {

  let observeOb = new observe();

  function comment() {
    this.commentList = [{
      type: 'hot',
      content: '热门评论1',
    }];
    observeOb.register('getHot', function () {
      let _arr = [];
      let self = this;
      self.commentList.forEach(item => {
        if (item.type === 'hot') {
          _arr.push(item);
        }
      });
      return _arr;
    });
  }

  function index() {
    observeOb.fire('getHot');
  }
}

/**
 * 有一个转盘，每转一圈，速度减慢
 */
function turnPlate() {
  let observeOb = new observe();
  let _domArr = [];

  function htmlInit(target) {
    for (let i = 0; i < 9; i++) {
      let _div = document.createElement('div');
      _div.innerHTML = i;
      _div.setAttribute('class', 'item');
      target.appendChild(_div);
      _domArr.push(_div);
    }
  }

  /**
   * 转4圈，随机40-49
   * @returns {number}
   */
  function getFinal() {
    let _num = Math.random() * 10 + 40;
    return Math.floor(_num, 0);
  }

  /**
   *
   * @param moveConfig
   * moveConfig:{ moveTime: 10, speed: 50 }
   */
  function mover(moveConfig) {
    let nowIn = 0;
    let removeNum = 9;
    let timer = setInterval(() => {
      if (nowIn !== 0) {
        removeNum = nowIn - 1;
      }
      _domArr[removeNum].setAttribute('class', 'item');
      _domArr[nowIn].setAttribute('class', 'item item-on');
      nowIn++;
      if (nowIn === moveConfig.moveTime) {
        clearInterval(timer);
        if (moveConfig.moveTime === 10) {
          observeOb.fire('finish');
        }
      }
    }, moveConfig.speed);
  }

  function moveControl() {
    let final = getFinal();
    let _circle = Math.floor(final / 10, 0);
    let stopNum = final % 10;
    let speed = 2000;
    let _runCircle = 0;
    observeOb.register('finish', () => {
      let _time = 0;
      _speed -= 50;
      _runCircle++;
      if (_runCircle <= _circle) {
        _time = 0;
      } else {
        _time = stopNum;
      }
      mover({
        moveTime: _time,
        speed: _speed,
      });
    });
  }
}

/**
 * 职责链模式：把需要做的事情组织为一条有序的链条，通过这条链体传递消息来完成功能
 * 适用于不涉及到复杂异步的操作
 */

/**
 * Axios的拦截器
 * 拦截器设计，可以看成一个用职责链的思想去处理请求
 */
function x() {

  function axios() {
    this.interceptors = {
      request: new interceptorsManager(),
      response: new interceptorsManager(),
    };
  }

  axios.prototype.request = function () {
    let chain = [disPathRequest, undefined];
    let promise = Promise.resolve(config);
    this.interceptors.request.handlers.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.handlers.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
  };

  function interceptorsManner() {
    this.handlers = [];
  }

  interceptorsManner.prototype.use = function (fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected,
    });
  };
}

/**
 * 有一个表单先前台校验，再后台校验
 */
function y() {

}





