<template>
  <div>
    <h3>Custom</h3>
    <s-custom-select :selected="selected" :list="list" @change="handleChange"></s-custom-select>
  </div>
</template>

<script>
import SCustomSelect from '@/components/SCustomSelect';

export default {
  name: 'SCustom',
  components: { SCustomSelect },
  data() {
    let list = [{
      name: '霍乱',
      value: 'A',
    }, {
      name: '鼠疫',
      value: 'B',
    }, {
      name: '甲流',
      value: 'C',
    }];
    return {
      list,
      selected: list[0],
    };
  },
  methods: {
    handleChange(i) {
      this.selected = {...i}
    },
  },
};
</script>

<style scoped>

</style>
