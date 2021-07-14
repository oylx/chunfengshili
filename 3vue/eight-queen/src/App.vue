<template>
  <div id="app">
    <component-attr></component-attr>
<!--    <decorate></decorate>-->
<!--    <div>-->
<!--      <renderless-validate></renderless-validate>-->
<!--    </div>-->
<!--    <div>-->
<!--      <button type="button" class="btn btn-default" @click="toast">click</button>-->
<!--    </div>-->
<!--    <div>-->
<!--      <s-mixin></s-mixin>-->
<!--    </div>-->
<!--    <div>-->
<!--      <p>姓名:</p>-->
<!--      <s-custom-wrap-input v-model="value"></s-custom-wrap-input>-->
<!--      {{ value }}-->
<!--    </div>-->
<!--    <s-slot-demo></s-slot-demo>-->
<!--    <s-custom></s-custom>-->
<!--    <s-text></s-text>-->
<!--    <s-select></s-select>-->
<!--    <s-directive-page></s-directive-page>-->
<!--    <eight-queen></eight-queen>-->
<!--    <div>-->
<!--      {{ msg }}-->
<!--      <event-parent-child :msg="msg" @update:msg="msg=$event"></event-parent-child>-->
<!--    </div>-->
  </div>
</template>

<script>
// import EightQueen from '@/components/EightQueen';
// import EventParentChild from '@/components/EventParentChild';
// import SDirectivePage from '@/components/SDirectivePage';
// import SText from '@/components/SText';
// import SSelect from '@/components/SSelect';
// import SCustom from '@/components/SCustom';
// import SSlotDemo from '@/components/SSlotDemo';
// import SCustomWrapInput from '@/components/SCustomWrapInput';
// import SMixin from '@/components/composition/mixin/SMixin';
// import RenderlessValidate from '@/components/composition/renderless/RenderlessValidate';
// import Decorate from '@/components/Decorate';
import ComponentAttr from '@/components/ComponentAttr';

export default {
  name: 'App',
  components: {
    ComponentAttr,
    // Decorate,
    // RenderlessValidate,
    // SMixin,
    // SCustomWrapInput,
    // SSlotDemo,
    // SCustom,
    // SSelect,
    // SText,
    // SDirectivePage,
    // EventParentChild,
    // EightQueen,
  },
  data() {
    return {
      // msg: '',
      // value: '',
    };
  },
  methods: {
    // onBlur(v) {
    //   console.log(v);
    // },
    // toast () {
    //   this.$toast('操作成功', {
    //     callback () {
    //       console.log('结束了')
    //     },
    //     type: 'success',
    //     autoClose: true,
    //     position: 'topRight'
    //   })
    // }
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
