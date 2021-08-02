<template>
  <input type="checkbox" :checked="value" @change="handleChange"/>
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
  watch: {
    value(newVal){
      this.currentValue = newVal;
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
