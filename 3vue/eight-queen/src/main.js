import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ToastPlugin } from './common/toast/index';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ToastPlugin);

// 全局注册指令
Vue.directive('color1', {
  inserted: function (el, binding) {
    const { value } = binding;
    el.style.color = value;
  },
});

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
