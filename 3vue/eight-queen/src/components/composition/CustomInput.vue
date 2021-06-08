<template>
  <input type="text" @blur="$emit('blur')">
</template>

<script>
export default {
  name: 'CustomInput',
};
</script>

<style scoped>

</style>
