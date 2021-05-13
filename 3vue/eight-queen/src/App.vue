<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <eight-queen></eight-queen>
    <div>
      {{ msg }}
      <event-parent-child :msg="msg" @update:msg="msg=$event"></event-parent-child>
    </div>
  </div>
</template>

<script>
import EightQueen from '@/components/EightQueen';
import EventParentChild from '@/components/EventParentChild';

export default {
  name: 'App',
  components: {
    EventParentChild,
    EightQueen,
  },
  data() {
    return {
      msg: '',
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
