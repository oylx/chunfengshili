(function (){
  function pop(type, content, color) {
    if (this instanceof pop) {
      var s = new this[type](content, color);
    } else {
      return new pop(type, content, color);
    }
    pop.prototype.infoPop = function () {};
    pop.prototype.confirmPop = function () {};
    pop.prototype.cancelPop = function () {};
  }
  window.pop = pop;
})()
// var pop1 = new pop('infoPop');

// Vue的初始化,建造者模式
// function Vue(options) {
//   if(!(this instanceof Vue)) {
//     console.warn('Vue instance')
//   }
//   this._init(options)
// }
// initMixin(Vue);
// stateMixin(Vue);
// eventsMixin(Vue);
// lifeCircleMixin(Vue);
// renderMixin(Vue);

// 单例模式示例：写一个全局数据存储对象
function store() {
  this.store = {}
  if(store.install) {
    return store.install
  }
  store.install = this
}
store.install = null
let s1 = new store()
let s2 = new store()
s1.store.a = 1
console.log(s2);

// vue-router如何全局唯一
let _Vue
function install(Vue){
  if(install.installed && _Vue === Vue) return
  // 注册代码
  install.installed = true
  _Vue = Vue
}














