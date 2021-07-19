<template>
<div>
  <p>儿子的name：{{name}}</p>
</div>
</template>

<script>
export default {
  name: 'son',
  props: ['name'],
  mounted() {
    setTimeout(() => {
      this.$emit('update:name', '小七')
    },5000)
  }
};
</script>

<style scoped>

</style>
