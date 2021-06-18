export default class HistoryBase {
  constructor({ routerTable }) {
    this.routerTable = routerTable;
  }

  transitionTo(target) {
    const route = this.routerTable.match(target);
    this.current = route;
    this.cb(this.current)
  }

}

