<template>
  <div>
    <input
      v-model="value"
      @input="$emit('input', value)"
      @blur="$emit('blur')" />
  </div>
</template>

<script>
export default {
  name: 'SCustomWrapInput',
  model: {
    prop: 'initValue',
    event: 'input',
  },
  props: ['initValue'],
  data() {
    return {
      value: this.initValue,
    };
  },
};
</script>

<style scoped>
.el-input {
  padding: 20px;
}
.el-input >>> .el-input__inner {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
