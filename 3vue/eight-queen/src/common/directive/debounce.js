const debounce = function (fn, delay, ctx) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, delay);
  };
};


export default {
  inserted (el, { value }, vnode) {
    let { target, time} = value
    time = parseInt(time)
    const debounced = debounce(target, time, vnode)
    el.addEventListener('click', debounced)
    el._debounced = debounced
  },
  destroy (el) {
    el.removeEventListener('click', el._debounced)
  }
}
