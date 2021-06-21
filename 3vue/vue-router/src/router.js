import Vue from 'vue';
import Router from 'vue-router';
import Foo from '@/pages/Foo';
import Bar from '@/pages/Bar';

Vue.use(Router);
const router = new Router({
  routes: [{
    path: '/foo',
    component: Foo,
  }, {
    path: '/bar',
    component: Bar,
  }],
});

router.beforeEach((to, from) => {
  console.log('beforeEach:', to, from);
})

router.afterEach((to, from) => {
  console.log('afterEach:', to, from);
})
export default router;
