<template>
  <button @click="$emit('update:msg','hi')">
    say{{ msg }}
  </button>
</template>

<script>
export default {
  name: 'EventParentChild',
  props: ['msg'],
};
</script>

<style scoped>
</style>
