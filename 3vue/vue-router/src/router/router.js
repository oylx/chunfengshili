import Html5Mode from './history/html5';
import Vue from 'vue';

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
    this.routeTable = new RouterTable(routes);
    this.history = new Html5Mode(this);
  }

  init(app) {
    const { history } = this;
    history.listen(route => {
      app._route = route;
    });
  }
}

Router.install = function () {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router !== undefined) { // main.js里面初始化的router
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        // 路由响应式
        Vue.util.defineReactive(this, '_route', this._route.history.current);
      }
    },
  });
};

