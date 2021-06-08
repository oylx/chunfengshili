<template>
  <div>
    <el-input
      v-bind="$attrs"
      v-on="$listeners"/>
  </div>
</template>

<script>
export default {
  name: 'SCustomWrapInput',
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
