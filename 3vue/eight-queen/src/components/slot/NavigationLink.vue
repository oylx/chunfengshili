<template>
  <a
    v-bind:href="url"
    class="nav-link"
  >
    <slot :user="user">Submit</slot>
  </a>
</template>

<script>
export default {
  name: 'NavigationLink',
  props: ['url'],
  data() {
    return {
      user: {
        name: 'xiaoqi'
      }
    }
  }
};
</script>

<style scoped>

</style>
