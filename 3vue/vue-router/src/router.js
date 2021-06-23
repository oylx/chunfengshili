import Vue from 'vue';
import Router from './router/router';
// import Router from 'vue-router';
import Foo from '@/pages/Foo';
import Bar from '@/pages/Bar';

Vue.use(Router);
const router = new Router({
  routes: [{
    path: '/foo',
    component: Foo,
    beforeEnter(to, from, next) {
      console.log('/foo:beforeEnter:4', to, from);
      next();
    }
  }, {
    path: '/bar',
    component: Bar,
  }],
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach:1', to, from);
  next();
});

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve:2', to, from);
  next();
})

router.afterEach((to, from) => {
  console.log('afterEach:3', to, from);
});
export default router;
