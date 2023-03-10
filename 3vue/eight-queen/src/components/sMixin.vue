<template>
  <tree @my-click="doSomething">sMixin</tree>
</template>

<script>
import Tree from './sMixin/tree'
import TreeMixins from './sMixin/mixin'
export default {
  name: "sMixin.vue",
  mixins: [TreeMixins],
  components: { Tree },
}
</script>

<style scoped>

</style>
