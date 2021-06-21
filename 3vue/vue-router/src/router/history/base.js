export default class BaseHistory {
  constructor({routerTable}) {
    this.routerTable = routerTable;
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
    this.current = this.routerTable.match(target);
    this.cb(this.current);
  }

}

