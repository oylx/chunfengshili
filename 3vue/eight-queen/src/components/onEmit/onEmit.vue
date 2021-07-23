<template>
  <section>
    <h1>left</h1>
    <el-button type="primary" @click="isClick">点击</el-button>
    <el-button type="primary" @click="isClickOther">点击</el-button>
  </section>
</template>

<script>
export default {
  methods: {
    isClick() {
      this.$emit('isLeft', '点击事件！');
    },
    isClickOther() {
      this.$emit('isRight', ['点击1', '点击2']);
    }
  },
  mounted() {
    this.$on('isLeft', (val) => {
      console.log(val);
    });
    this.$on('isRight', (...val) => {
      console.log(val);
    });
    this.$on(['isLeft', 'isRight'], () => {
      console.log(666);
    });
  }
}
</script>
