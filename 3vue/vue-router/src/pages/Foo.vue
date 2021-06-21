<template>
  <div>Foo</div>
</template>

<script>
export default {
  name: 'Foo',
  beforeRouteEnter(to, from, next) {
    console.log('foo::beforeRouteEnter:5', to, from);
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('foo::beforeRouteUpdate:6', to, from);
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('foo::beforeRouteLeave:7', to, from);
    next()
  }
};
</script>

<style scoped>

</style>
