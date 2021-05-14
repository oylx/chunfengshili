<template>
  <!--  1.v-resize指令，监听浏览器窗口大小改变的时候，通过监听onResize响应-->
<!--  <div v-resize="onResize">window width is: {{length}}</div>-->
  <!--  2.可通过direction控制监听页面高度或者宽度的变化-->
  <div v-resize:[direction].quiet="onResize">window height is:{{length}}</div>
  <!--  3.可通过 修饰符.quiet来控制是否在指令初始化的时候响应onResize函数-->
<!--  <div v-resize.x="onResize">window width is:{{length}}</div>-->
</template>

<script>
export default {
  name: 'SDirectivePage',
  data() {
    return {
      direction: "vertical",
      length: 0
    }
  },
  methods: {
    onResize(length) {
      this.length = length
    }
  }
};
</script>

<style scoped>

</style>
