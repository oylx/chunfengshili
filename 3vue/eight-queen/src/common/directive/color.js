function updateColor(el, value, interval) {
  if (Array.isArray(value)) {
    let i = 0;
    el.style.color = value[i];
    el.dataset.time = setInterval(() => {
      if (i > value.length - 1) {
        i = 0;
      }
      el.style.color = value[i];
      i++;
    }, interval);
  } else {
    el.style.color = value;
  }
}
export default{
  inserted: function (el, binding) {
    const { arg = 1000, value, } = binding;
    updateColor(el, value, arg);
  },
  componentUpdated: function (el, binding) {
    clearInterval(el.dataset.time);
    const { arg = 1000, value, } = binding;
    updateColor(el, value, arg);
  },
  unbind: function (el) {
    clearInterval(el.dataset.time);
  },
}

