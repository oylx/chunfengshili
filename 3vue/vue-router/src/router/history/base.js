import { runQueue } from '../util/async';

export default class BaseHistory {
  constructor(router) {
    this.router = router;
    this.routerTable = router.routerTable;
  }

  /**
   * 注册
   * @param cb
   */
  listen(cb) {
    this.cb = cb;
  }

  /**
   * 监听器
   * @param target
   */
  transitionTo(target) {
    const route = this.routerTable.match(target);
    this.confirmTransition(route, () => {
      this.updateRoute(route);
    }, () => {});
  }

  confirmTransition(route, onComplete, onAbout) {
    if (route === this.current) {
      return;
    }

    const queue = [
      ...this.router.beforeHooks,
      route.beforeEnter,
      route.component.beforeRouteEnter.bind(route.instance),
      ...this.router.resolveHooks
    ];

    const iterator = (hook, next) => {
      hook(route, this.current, (to) => {
        if (to === false) {
          onAbout && onAbout(to);
        } else {
          next(to);
        }
      });
    };

    runQueue(queue, iterator, () => onComplete());
  }

  updateRoute(route) {
    const from = this.current;
    this.current = route;
    this.cb(this.current);
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, from);
    });
  }

}

