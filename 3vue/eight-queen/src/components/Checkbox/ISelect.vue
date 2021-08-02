<template>
  <div>
    <select v-model="currentValue" @change="handleChange">
      <option :value="value" v-for="{value,name} in options" :key="value">{{ name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ISelect',
  props: {
    value: {
      type: String,
      default: '',
      required: true,
    },
    options: {
      type: Array,
      default: () => { return []; },
      required: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal;
    },
  },
  methods: {
    handleChange(e) {
      this.currentValue = e.target.value;
      this.$emit('input', this.currentValue);
    },
  },
};
</script>

<style scoped>

</style>
