let oDiv = document.getElementById('box');
let fn = () => console.log('我被触发了');
// https://segmentfault.com/a/1190000021720064
// 优化
/**
 * 防抖
 * 最后一个人说了算:我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。
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
 * 第一个人说了算:在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。
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
