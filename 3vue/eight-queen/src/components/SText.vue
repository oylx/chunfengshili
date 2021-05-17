<template>
  <div>
    <h3>Text</h3>
    {{ text }}
    <br>
    <!--    去除空格-->
    <input type="text" v-model.trim="text">
    <br>
    <!--    限制为num-->
    <input type="number" v-model.number="num">
    num:{{ typeof num }}
    <br>
    <!--    自制v-model 正常：value input-->
    <input type="text" :value="text" @input="text= $event.target.value">
    <br>
    <!--    在change而非input时更新-->
    <input type="text" v-model.lazy="text1">
    lazy:{{ text1 }}
    <br>
  </div>
</template>

<script>
export default {
  name: 'SText',
  data() {
    return {
      text: '',
      text1: '',
      num: 0,
    };
  },
};
</script>

<style scoped>

</style>
