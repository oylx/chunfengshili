import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import intersect from './directive/intersect';

Vue.config.productionTip = false;
Vue.directive('intersect', intersect);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
