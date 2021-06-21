import Html5Mode from './history/html5';
import Vue from 'vue';
import RouterView from '@/components/RouterView';
import RouterLink from '@/components/RouterLink';

Vue.component('RouterView', RouterView);
Vue.component('RouterLink', RouterLink);

class RouterTable {
  constructor(routes) {
    this._pathMap = new Map();
    this.init(routes);
  }

  init(routes) {
    const addRoute = (route) => {
      this._pathMap.set(route.path, route);
      // if (route.children) {}
    };
    routes.forEach(route => addRoute(route));
  }

  match(path) {
    let find;
    for (const key of this._pathMap.keys()) {
      if (path === key) {
        find = this._pathMap.get(path);
        break;
      }
    }
    return find;
  }
}

export default class Router {
  constructor({ routes = [] }) {
    this.routerTable = new RouterTable(routes);
    this.history = new Html5Mode(this);
  }

  /**
   * @param app vue里的唯一的单页应用
   */
  init(app) {
    const { history } = this;
    history.listen(route => {
      app._route = route;
    });
    history.transitionTo(history.getCurrentLocation());
  }

  push(to) {
    this.history.push(to);
  }
}

// 插件，router混入原型
Router.install = function () {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router !== undefined) { // main.js里面初始化的router
        this._routerRoot = this; // 根等于当前实例
        this._router = this.$options.router;
        this._router.init(this);
        // 下划线路由响应式，变化则自动渲染
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });
};

