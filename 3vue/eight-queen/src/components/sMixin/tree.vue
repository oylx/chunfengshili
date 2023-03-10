<template>
  <son @my-click="doSomething">tree</son>
</template>

<script>
import Son from './son'
export default {
  name: "tree.vue",
  components: { Son },
  methods:{
    doSomething() {
      console.log('tree本身组件点击')
    }
  }
}
</script>

<style scoped>

</style>
