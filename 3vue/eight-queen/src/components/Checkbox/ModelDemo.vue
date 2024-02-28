<!--v-model 实际上就是 $emit('input') 以及 props:value 的组合语法糖，只要组件中满足这两个条件，就可以在组件中使用 v-model。-->
<!--虽然在有些交互组件中有些许不同，例如：-->
<!--checkbox 和 radio 使用 props:checked 属性和 $emit('change') 事件。-->
<!--select 使用 props:value 属性和 $emit('change') 事件。-->
<!--但是，除了上面列举的这些，别的都是 $emit('input') 以及 props:value 。-->
<!--$emit事件可以在任何地方,子组件可以任意组合，看具体input/select/checkbox判断$emit是哪种事件-->
<template>

  <div>
    <i-input v-model="number"></i-input>
    <p>{{ number }}</p>
    <i-checkbox v-model="checked"></i-checkbox>
    <p>{{ checked }}</p>
    <i-select v-model="selected" :options="options"></i-select>
    <p>{{ selected }}</p>
  </div>
</template>

<script>
import IInput from '@/components/Checkbox/IInput';
import ICheckbox from '@/components/Checkbox/ICheckbox';
import ISelect from '@/components/Checkbox/ISelect';
export default {
  name: 'ModelDemo',
  components: { ISelect, ICheckbox, IInput },
  data() {
    return {
      number: 10,
      checked: true,
      options: [{
        value: 'A',
        name: '苹果',
      }, {
        value: 'B',
        name: '香蕉',
      }, {
        value: 'C',
        name: '梨子',
      }],
      selected: 'A',
    }
  },
};
</script>

<style scoped>

</style>
