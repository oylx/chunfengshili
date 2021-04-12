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
var pop1 = new pop('infoPop');
