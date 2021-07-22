<!--https://juejin.cn/post/6844903910365200392#heading-0-->
<template>
  <div>
<!--    <h1 v-color1="color1">{{ textContext }}</h1>-->
<!--    <h1 v-color2="color2">{{ textContext }}</h1>-->
<!--    &lt;!&ndash;  写成[interval]被binding.arg拿到500，否则被binding.arg拿到的是字符串interval&ndash;&gt;-->
<!--    <h1 v-color3:[interval].foo.bar="color3">自定义指令</h1>-->
<!--    <h1 v-color3.foo.bar="color3">自定义指令</h1>-->
<!--    <button @click="interval+=100">慢点闪</button>-->
<!--    <button @click="interval-=100">快点闪</button>-->
    <button v-debounce="debounceOption">debounce</button>
    <button v-longpress="longPressOption">长按</button>
  </div>
</template>

<script>
import color3 from '@/common/directive/color'
import debounce from '@/common/directive/debounce'
import longpress from '@/common/directive/longpress'
export default {
  name: 'SDirective',
  data() {
    return {
      color1: 'red',
      color2: 'blue',
      color3: ['red', 'blue', 'green', 'yellow', 'Pink', 'purple'],
      interval: 500,
      textContext: '1234',
      foo: true,
      bar: true,
      debounceOption: {
        time: 800,
        target: this.handleClick
      },
      longPressOption: {
        fn: this.handlePress,
        time: 2000
      }
    };
  },
  // 局部注册指令 directives: { ClickOutside },

  // bind：只调用一次，在指令第一次绑定到元素时调用，可以在这个钩子函数中进行初始化设置;
  // inserted：被绑定元素插入父节点时调用,在bind后面调用；
  // update：所在绑定的组件的VNode更新时调用，但是可能发生在其子VNode更新之前。调用时指令的值不一定发生改变，通过比较更新前后的值来忽略不必要的模板更新；
  // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用;
  // unbind：只调用一次，指令与元素解绑时调用。
  directives: {
    color2: {
      // 从上面的例子的可以看到inserted的选项的值是个Funcion,其中el binding就是钩子函数的参数，其有4个参数：
      // el：指令所绑定的元素，可以用来直接操作DOM；
      // binding：一个对象其中包括以下几个属性；
      //     name：指令名，不包括 v- 前缀;
      //     value：指令的绑定值，例：v-my-directive="1 + 1"中，绑定值为 2；
      //     expression：指令的绑定的表达式。例：v-my-directive="1 + 1"中，表达式为 "1 + 1"；
      //     arg：传给指令的参数，例v-my-directive:foo中，参数为 "foo";
      //     modifiers：一个包含修饰符的对象。例:v-my-directive.foo.bar中，修饰符对象为 { foo: true, bar: true },
      //     oldValue：指令绑定的前一个值，仅在update和componentUpdated钩子中可用。无论值是否改变都可用。
      //     vnode：Vue 编译生成的虚拟节点；
      //     oldVnode：上一个虚拟节点，仅在update和componentUpdated钩子中可用。
      bind: function () {
        console.log('bind');
      },
      inserted: function (el, binding) {
        console.log('inserted');
        el.style.color = binding.value;
      },
      update: function (el, binding) {
        console.log('update');
        el.style.color = binding.value;
      },
      componentUpdated: function (el, binding) {
        console.log('componentUpdated');
        el.style.color = binding.value;
      },
      unbind: function () {
        console.log('v-color指令解绑');
      },
    },
    color3,
    debounce,
    longpress
  },
  methods: {
    handleClick() {
      this.log(this.color1);
    },
    handlePress() {
      this.log(this.color2)
    },
    log(val) {
      console.log(val)
    }
  },
};
</script>

<style scoped>

</style>
