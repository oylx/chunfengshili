<template>
  <div @click="myClick">son</div>
</template>

<script>
export default {
  name: "son.vue",
  methods: {
    myClick() {
      console.log('son')
      this.$emit('my-click')
    }
  }
}
</script>

<style scoped>

</style>
