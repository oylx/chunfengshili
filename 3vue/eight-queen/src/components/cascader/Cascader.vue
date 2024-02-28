<template>
  <el-cascader
    :options="options"
    v-model="value"
    :props="{
      checkStrictly: true,
      value: 'id',
      label: 'name',
    }"
    @change="handleChange"
    clearable>
  </el-cascader>
</template>

<script>
import { options1 as options } from './config'
export default {
  name: 'Cascader',
  data() {
    return {
      options,
      value: 6622
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  },
  mounted() {
    setTimeout(() => {
      this.value = 6644
    }, 5 * 1000)
  }
}
</script>

<style scoped>

</style>
