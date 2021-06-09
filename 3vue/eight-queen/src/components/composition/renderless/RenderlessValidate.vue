<template>
  <s-validate #default="{ validate }" :value="value" :rules="rules">
    <input type="text" @blur="validate" v-model="value"/>
  </s-validate>
</template>

<script>
// 复用的逻辑沉淀包含在slot插槽的组件
// 接口由插槽prop来暴露
// 优点:模板可复用 不会出现命名冲突 符合依赖倒置原则 复用接口来源清晰
import SValidate from './SValidate';

export default {
  name: 'RenderlessValidate',
  components: { SValidate },
  data: () => ({
    value: 'hi',
    rules: [{
      test: function (value) {
        return /\d+/.test(value);
      },
      message: '请输入一个数字',
    }],
  }),
};
</script>

<style scoped>

</style>
