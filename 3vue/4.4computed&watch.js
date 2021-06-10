// 1. let x = computed(() => {count.value + 3;});
// 2.watch(() => count.value, (newValue, oldValue) => {}, { immediate: true });
// 3.let stop = watchEffect(() => count.value+3)

let active;
let queue = [];

let effect = (fn, options = {}) => {
  let effect = (...args) => {
    try {
      active = effect;
      return fn(...args);
    } finally {
      active = null;
    }
  };
  effect.options = options;
  effect.deps = [];
  return effect;
};

let cleanUpEffect = effect => {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
  }
};

let watchEffect = cb => {
  let runner = effect(cb);
  runner();
  return () => {
    cleanUpEffect(runner);
  };
};

let nextTick = cb => Promise.resolve().then(cb);

let queueJob = job => {
  if (!queue.includes(job)) {
    queue.push(job);
    nextTick(flushJobs);
  }
};

let flushJobs = () => {
  let job;
  while ((job = queue.shift()) !== undefined) {
    job();
  }
};

class Dep {
  deps = new Set();

  depend() {
    if (active) {
      this.deps.add(active);
      active.deps.push(this.deps);
    }
  }

  notify() {
    this.deps.forEach(dep => queueJob(dep));
    this.deps.forEach(dep => {
      dep.options && dep.options.schedular && dep.options.schedular();
    });
  }
}

let ref = initValue => {
  let value = initValue;
  let dep = new Dep();
  return new Proxy({
    value: initValue
  }, {
    get(target, prop, receiver) {
      dep.depend();
      console.log(target,prop);
      return Reflect.get(target, prop);
    },
    set(target, prop, value, receiver) {
      Reflect.set(target, prop, value);
      dep.notify();
    },
  });
  // return Object.defineProperty({}, 'value', {
  //   get() {
  //     dep.depend();
  //     return value;
  //   },
  //   set(newValue) {
  //     value = newValue;
  //     dep.notify();
  //   },
  // });
};

let computed = fn => {
  let value;
  let dirty = true;
  let runner = effect(fn, {
    schedular: () => {
      if (!dirty) {
        dirty = true;
      }
    },
  });
  return {
    get value() {
      if (dirty) {
        value = runner();
        dirty = false;
      }
      return value;
    },
  };
};

let watch = (source, cb, options = {}) => {
  let { immediate } = options;
  const getter = () => {
    return source();
  };
  let oldValue;
  const runner = effect(getter, {
    schedular: () => applyCb(),
  });

  const applyCb = () => {
    let newValue = runner();
    if (newValue !== oldValue) {
      cb(newValue, oldValue);
      oldValue = newValue;
    }
  };
  if (immediate) {
    applyCb();
  } else {
    oldValue = runner();
  }
};

let count = ref(0);
let computedValue = computed(() => count.value + 3);

document.getElementById('add').addEventListener('click', () => {
  count.value++;
});
let str = '';
let stop = watchEffect(() => {
  str = `hello ${count.value} ${computedValue.value}`;
  document.getElementById('app').innerText = str;
});
setTimeout(() => {
  stop();
}, 3000);
watch(() => count.value, (newValue, oldValue) => {
  console.log(newValue, oldValue);
}, {
  immediate: true,
});



