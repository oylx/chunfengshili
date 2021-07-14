<template>
  <div class="sunClass">
    我是孙子组件
    <h2>接收爷组件数据:-->{{ msg2 }}</h2>
    <h2>接收爷组件数据:-->{{ msg3 }}</h2>
    <h2>接收爷组件数据:-->{{ $attrs.msg4 }}</h2>
    <button @click="sendToZu">孙传祖</button>
  </div>
</template>

<script>
export default {
  // $attrs一般搭配interitAttrs 一块使用
  inheritAttrs: false, // 默认会继承在html标签上传递过来的数据，类似href属性的继承
  /*
   孙子组件通过props，就能接收到父组件传递过来的$attrs了，就能拿到里面的数据了，也就是：
   爷传父、父传子。即：祖孙之间的数据传递。
   */
  props: {
    msg2: {
      type: String,
      default: "",
    },
    msg3: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  name: "Son",
  data() {
    return {
      data: "来自孙组件的数据",
    };
  },
  methods: {
    sendToZu() {
      // 孙组件能够触发爷组件的fromSun方法的原因还是因为父组件中有一个$listeners作为中间人，去转发这个事件的触发
      this.$emit("fromSun", this.data);
    },
  },
};
</script>

<style lang="less" scoped>
.sunClass {
  width: 750px;
  height: 180px;
  background-color: #bfa;
  margin-top: 80px;
  margin-left: 50px;
}
</style>
