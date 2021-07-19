<template>
  <div>
    <div>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>start</p>
    </div>
    <lazy-component @show="handlerComponentShow"></lazy-component>
    <div>
      <p>end</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SLazy',
  data() {
    return {};
  },
  methods: {
    handlerComponentShow() {
      console.log('this component is showing');
    },

  },
};
</script>

<style scoped>

</style>
