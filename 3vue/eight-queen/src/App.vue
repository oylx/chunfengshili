<template>
  <div id="app">
    <div>
      <p>姓名:</p>
      <s-custom-wrap-input v-model="value"></s-custom-wrap-input>
      {{ value }}
    </div>
    <s-slot-demo></s-slot-demo>
    <s-custom></s-custom>
    <s-text></s-text>
    <s-select></s-select>
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
import SText from '@/components/SText';
import SSelect from '@/components/SSelect';
import SCustom from '@/components/SCustom';
import SSlotDemo from '@/components/SSlotDemo';
import SCustomWrapInput from '@/components/SCustomWrapInput';

export default {
  name: 'App',
  components: {
    SCustomWrapInput,
    SSlotDemo,
    SCustom,
    SSelect,
    SText,
    SDirectivePage,
    EventParentChild,
    EightQueen,
  },
  data() {
    return {
      msg: '',
      value: '',
    };
  },
  methods: {
    onBlur(v) {
      console.log(v);
    }
  }
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
