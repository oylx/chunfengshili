let x;
let y;
let f = n => n * 100 + 100;
let activeCb;

let onXChanged = cb => {
  activeCb = cb;
  activeCb();
  activeCb = null;
};

class Dep {
  deps = new Set();

  /**
   * 永久存入activeCb
   */
  add() {
    if (activeCb) {
      this.deps.add(activeCb);
    }
  }

  notify() {
    this.deps.forEach(dep => dep());
  }
}

let ref = initValue => {
  // 2个闭包 value dep
  let value = initValue;
  let dep = new Dep();

  return Object.defineProperty({}, 'value', {
    get() {
      dep.add();
      return value;
    },
    set(newValue) {
      value = newValue;
      dep.notify();
    },
  });
};

init = () => {
  x = ref(1);
  let activeCallback1 = () => {
    y = f(x.value); // x get => add cb
    console.log(y);
  };
  let activeCallback2 = () => {
    y = f(x.value + 10); // x get => add cb
    console.log(y);
  };
  onXChanged(activeCallback1); // 第一次调用active
  onXChanged(activeCallback2); // 第二次调用active
};
init();
x.value = 2; // s set => notify cbs
x.value = 3; // s set => notify cbs
