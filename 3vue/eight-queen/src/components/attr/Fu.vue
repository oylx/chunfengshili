<template>
  <div class="fatherClass">
    我是父组件
<!--    <h2>{{ visible }}</h2>-->
<!--    <h2>{{ $attrs.msg2}}</h2>-->
<!--    <h2>{{ $attrs.msg3}}</h2>-->
<!--    <h2>{{ $attrs.msg4}}</h2>-->

<!--    <son :msg2="$attrs.msg2" :msg3="$attrs.msg3" :msg4="$attrs.msg4"></son>-->

    <son v-bind="$attrs" v-on="$listeners"></son>
  </div>
</template>

<script>
import Son from './Son'
export default {
  name: "Fu",
  components: { Son },
  props: {
    visible: {
      type: String,
      default: "",
    },
  },
  mounted() {
    console.log('fu组件实例',this);
  },
};
</script>
<style lang="less" scoped>
.fatherClass {
  width: 850px;
  height: 400px;
  background-color: #baf;
  margin-left: 50px;
  margin-top: 50px;
}
</style>
