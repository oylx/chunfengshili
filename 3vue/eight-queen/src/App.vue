<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <s-directive-page></s-directive-page>
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
import SDirectivePage from '@/components/SDirectivePage';

export default {
  name: 'App',
  components: {
    SDirectivePage,
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
