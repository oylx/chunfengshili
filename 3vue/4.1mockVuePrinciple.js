let x;
let y;
let f = n => n * 100 + 100;
let active;

let onXChanged = cb => {
  active = cb;
  active();
  active = null;
};

class Dep {
  deps = new Set();

  depend() {
    if (active) {
      this.deps.add(active);
    }
  }

  notify() {
    this.deps.forEach(dep => dep());
  }
}

let ref = initValue => {
  // 2个闭包
  let value = initValue;
  let dep = new Dep();

  return Object.defineProperty({}, 'value', {
    get() {
      dep.depend();
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
  let activeCallback = () => {
    y = f(x.value);
    console.log(y);
  }
  onXChanged(activeCallback);
};
init();
x.value = 2;
x.value = 3;
