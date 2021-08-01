<template>
  <div>儿子:{{ name2 }}</div>
</template>

<script>
export default {
  name: 'Three',
  props: [ 'name2'],
  mounted() {
    setTimeout(() => {
      this.$emit('update:name2', '孙子更新')
    },3000)
  }
};
</script>

<style scoped>

</style>
