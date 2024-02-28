<template>
  <div id="app">
<!--    <s-chat-gpt />-->
<!--      <drag-table></drag-table>-->
<!--    <s-scroll></s-scroll>-->
<!--    <s-lazy></s-lazy>-->
<!--    <s-sync></s-sync>-->
    <model-demo></model-demo>
<!--    <one></one>-->
<!--    <on-emit></on-emit>-->
<!--    <s-directive></s-directive>-->

<!--    <s-provide></s-provide>-->
<!--    <s-cascader />-->
<!--    <component-attr />-->
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
<!--   <s-slot-demo></s-slot-demo>-->
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
// import SSlotDemo from './components/SSlotDemo.vue';
// import SCustomWrapInput from '@/components/SCustomWrapInput';
// import SMixin from '@/components/composition/mixin/SMixin';
// import RenderlessValidate from '@/components/composition/renderless/RenderlessValidate';
// import Decorate from '@/components/Decorate';
// import ComponentAttr from '@/components/ComponentAttr';
// import SCascader from '@/components/cascader/Cascader'
// import SProvide from '@/components/SProvide';
// import SDirective from '@/components/SDirective';
// import OnEmit from '@/components/onEmit/onEmit';
// import One from '@/components/sync/One';
import ModelDemo from '@/components/Checkbox/ModelDemo';
// import DragTable from "./components/DragTable"
// import SMixin from "@/components/sMixin";
// import SJsonp from '@/components/SJsonp'
// import SSync from '@/components/SSync';
// import SLazy from '@/components/SLazy';
// import SScroll from '@/components/SScroll';

// import SChatGpt from '@/components/SChatGpt'
export default {
  name: 'App',
  components: {
    // SChatGpt,
    // SCascader,
    // DragTable,
    ModelDemo,
    // One,
    // OnEmit,
    // SScroll,
    // SLazy,
    // SSync,
    // SDirective,
    // SProvide,
    // ComponentAttr,
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
    // SMixin
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
* {
  margin: 0;
  padding: 0;
  border: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
