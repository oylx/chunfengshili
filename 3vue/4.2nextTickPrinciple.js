// 异步更新队列
let active;
let watch = cb => {
  active = cb;
  active();
  active = null;
};
let queue = [];

let nextTick = cb => Promise.resolve().then(cb);
let queueJob = job => {
  if (!queue.includes(job)) {
    // 相同的job执行1次，按eventLoop执行
    queue.push(job);
    nextTick(flushJobs)
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
    if (active) this.deps.add(active); //首次执行
  }

  notify() {
    this.deps.forEach(dep => queueJob(dep));
  }
}

let ref = initValue => {
  let num = initValue;
  let dep = new Dep();
  return Object.defineProperty({}, 'num', {
    get() {
      dep.depend();
      return num;
    },
    set(newValue) {
      num = newValue;
      dep.notify();
    },
  });
};

let x = ref(1);
let y = ref(2);
let z = ref(3);
watch(() => {
  let tpl = `hello ${x.num} ${y.num} ${z.num}`;
  console.log(tpl);
  document.body.append(tpl);
});
x.num = 4;
y.num = 5;
z.num = 6;
// setTimeout(() => {
//   x.num = 4;
// }, 0)
// setTimeout(() => {
//   y.num = 5;
// }, 0)
// setTimeout(() => {
//   z.num = 6;
// }, 0)
