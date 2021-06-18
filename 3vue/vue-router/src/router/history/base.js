export default class HistoryBase {
  constructor({ routerTable }) {
    this.routerTable = routerTable;
  }

  listen(cb) {
    this.cb = cb;
  }

  transitionTo(target) {
    this.current = this.routerTable.match(target);
    this.cb(this.current);
  }

}

