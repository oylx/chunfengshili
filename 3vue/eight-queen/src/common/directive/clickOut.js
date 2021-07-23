export default {
  bind: function (el, { value = {}}) {
    const { fn } = value
    if(typeof fn !== 'function') return
    el._clickOut = function (e) {
      if(el.contains(e.target) || el === e.target) return
      fn()
    }
    setTimeout(()=> {
      window.addEventListener('click', el._clickOut)
    }, 0)
  },
  unbind: function (el) {
    window.removeEventListener('click', el._clickOut)
  },
}
