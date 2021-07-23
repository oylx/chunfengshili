const throttle = function (fn, time, ctx) {
  let flag = true; // flag为true才能执行
  let timer = null;
  return function (...args) {
    if (!flag) return;
    flag && fn.apply(ctx, args);
    flag = false; // 关闭开关
    if (timer !== null) { //关闭上次的定时器
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => { //等过一段时间打开flag开关
      flag = true;
    }, time);
  };
};
export default {
  bind: function (el, binding, vnode) {
    let { fn, time = 800, type } = binding.value || {};
    if (typeof fn !== 'function') {
      return;
    }
    time = parseInt(time)
    el._throttled = throttle(fn, time, vnode);
    el.addEventListener(type, el._throttled);
  },
  unbind: function (el, binding) {
    let { type } = binding.value || {};
    el.removeEventListener(type, el._throttled())
  }
}
