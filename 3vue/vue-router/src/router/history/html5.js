import BaseHistory from './base.js';

export default class Html5History extends BaseHistory {
  constructor(options) {
    super(options);
    this.initListener();
  }

  initListener() {
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getCurrentLocation());
    });
  }

  getCurrentLocation() {
    let path = decodeURI(window.location.pathname) || '/';
    return path + window.location.search + window.location.hash;
  }

}
