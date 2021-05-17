<template>
  <div>
    <h3>Radio & checkbox</h3>
    <p>
      以下哪个不是甲类传染病
      <label v-for="i in list" :key="i.value">
        <input type="radio" v-model="selected" :value="i.value">
        {{ i.name }}
      </label>
      您选择了: {{ selected }}
    </p>
    <p>
      以下哪些是甲类传染病
      <label v-for="i in list" :key="i.value">
        <input type="checkbox" v-model="checked" :value="i.value">
        {{ i.name }}
      </label>
      您选择了:{{ checked.join(',') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'SRadio',
  data() {
    return {
      selected: 'A',
      checked: [],
      list: [{ A: '霍乱' }, { B: '鼠疫' }, { C: '甲流' },{
        name: '霍乱',
        value: "A"
      },{
        name:'鼠疫',
        value:'B'
      },{
        name:'甲流',
        value:'C'
      }],
    };
  },
};
</script>

<style scoped>

</style>
