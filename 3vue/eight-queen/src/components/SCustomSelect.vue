<template>
  <div>
    <div class="top" @click="showBottom= !showBottom">{{ selected.name }}</div>
    <div class="bottom" v-if="showBottom">
      <div v-for="i in list" :key="i.value" @click="select(i)">{{ i.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SCustomSelect',
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: ['list', 'selected'],
  data() {
    return {
      showBottom: false,
    };
  },
  methods: {
    select(i) {
      this.showBottom = false;
      this.$emit('change', i);
    },
  },
};
</script>

<style scoped>
.top {
  border: 1px solid #999999;
  padding: 2px;
}
.bottom {
  position: relative;
  border: 1px solid #999999;
  top: -1px;
}
</style>
