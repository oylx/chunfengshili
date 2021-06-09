let x;
let y;
let f = n => n * 100 + 100;
let active;

let onXChanged = cb => {
  active = cb;
  active();
};

let ref = initValue => {
  let value = initValue;
  return Object.defineProperty({}, 'value', {
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
      active();
    },
  });
};

x = ref(1);
onXChanged(() => {
  y = f(x.value);
  console.log(y);
});
x.value = 2;
x.value = 3;
