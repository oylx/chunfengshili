<template>
  <div>
    <button @click="increase(-1)">-1</button>
    <input type="number" :value="currentValue" />
    <button @click="increase(1)">+1</button>
  </div>
</template>

<script>
export default {
  name: "IInput",
  props:{
    value:{
      type: Number,
      default: 0,
      require: true
    }
  },
  data(){
    return{
      currentValue: this.value
    }
  },
  methods:{
    increase(value){
      this.currentValue+= value;
      this.$emit('input', this.currentValue);
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
