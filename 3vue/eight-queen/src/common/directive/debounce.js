const debounce = function (fn, delay, ctx) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, delay);
  };
};

export default {
  inserted(el, binding, vnode) {
    let { time, target, } = binding.value || {};
    time = parseInt(time);
    el._debounced = debounce(target, time, vnode);
    el.addEventListener('click', el._debounced);
  },
  destroy(el) {
    el.removeEventListener('click', el._debounced)
  }
}
