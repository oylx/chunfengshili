<template>
  <div>
    <!--    shift按住多选-->
    <select v-model="selected" multiple>
      <option :value="value" v-for="{value,name} in list" :key="value">{{ name }}</option>
    </select>
    <div>
      当前选择：{{ selected.join(',') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SSelect',
  data() {
    return {
      list: [{
        value: 'A',
        name: '苹果',
      }, {
        value: 'B',
        name: '香蕉',
      }, {
        value: 'C',
        name: '梨子',
      }],
      selected: [],
    };
  },
};
</script>

<style scoped>

</style>
