let oDiv = document.getElementById('box');
let fn = () => console.log('我被触发了');
/**
 * 防抖
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
const debounce = function (fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const timer = 800;
const move = debounce(fn, timer);
oDiv.addEventListener('mousemove', move, false);

/**
 * 节流函数
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
let throttle = (fn, delay) => {
  let flag = false; // flag= false 表示执行函数不工作
  return function(...args) {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      fn.apply(...args);
      flag = false;
    }, delay)
  }
}
