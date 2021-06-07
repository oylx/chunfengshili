<template>
  <div>
    <div v-if="loading">loading...</div>
    <slot v-else>
      hello, {{ data.name }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SLoad',
  props: ['url', ],
  data() {
    return {
      loading: true,
      data: {},
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
      this.data = { name: 'LiLei', };
    },1000)
  }
};
</script>

<style scoped>

</style>
