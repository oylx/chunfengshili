let mixin = {
  say() {
    console.log(`${this.name}在说话`);
  },
  sing() {
    console.log(`${this.name}在唱歌`);
  },
  run() {
    console.log(`${this.name}在跑步`);
  },
};

class Student {
  constructor(name) {
    this.name = name;
  }
}

// 维护性好，减少内存重复占用
Object.assign(Student.prototype, mixin);
let student = new Student('王二猪');
student.run();
