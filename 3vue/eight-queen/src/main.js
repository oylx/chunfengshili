import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ToastPlugin } from './common/toast/index';
import VueLazyload from 'vue-lazyload';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ToastPlugin);

Vue.use(VueLazyload, {
  preLoad: 1.3, // 【提前加载】当元素距离顶部多少倍视口高度时开始加载，preLoad = 1 就是不提前加载
  error: '', // 加载失败的占位图
  loading: '', // 加载时的占位图
  attempt: 2,
  lazyComponent: true, // 开启懒加载组件
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'] // 监听的事件
});

// 全局注册指令
Vue.directive('color1', {
  inserted: function (el, binding) {
    const { value } = binding;
    el.style.color = value;
  },
});

// Vue.directive('debounce', {
//   inserted: function (el, binding) {
//     el.addEventListener('click', () => {
//
//       let { value: delayTime } = binding
//       delayTime = isNaN(delayTime) ? 800 : parseInt(delayTime)
//
//       el.setAttribute('disabled', 'disabled')
//       el.disabled = true
//       el.classList.add('is-disabled')
//       console.log(el, binding);
//       let t = setTimeout(() => {
//         clearTimeout(t)
//         t = null
//         el.disabled = false
//         el.removeAttribute('disabled')
//         el.classList.remove('is-disabled')
//       }, delayTime) // 时间可以根据实际情况定
//     })
//   },
//   unbind:function (el, binding) {
//     console.log(el, binding);
//   }
// });

Vue.directive('resize', {
  inserted(el, binding) {
    console.log(binding);
    const callback = binding.value;
    const direction = binding.arg;
    const modifiers = binding.modifiers;
    const result = () => {
      return direction === 'vertical' ? window.innerHeight : window.innerWidth;
    };
    window.addEventListener('resize', () => {
      callback(result());
    });
    if (!modifiers || !modifiers.quiet) {
      callback(result());
    }
    el._onResize = callback;
  },
  unbind(el) {
    if (!el._onResize) {
      return;
    }
    window.removeEventListener('resize', el._onResize);
    delete el._onResize;
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
