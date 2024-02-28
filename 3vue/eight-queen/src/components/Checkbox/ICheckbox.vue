<template>
  <input type="checkbox" :checked="currentValue" @change="handleChange"/>
</template>

<script>
export default {
  name: 'ICheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data(){
    return{
      currentValue: this.value
    }
  },
  methods: {
    handleChange(e) {
      this.currentValue = e.target.checked
      this.$emit('input', this.currentValue)
    }
  }
};
</script>

<style scoped>

</style>
