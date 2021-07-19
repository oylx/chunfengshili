<template>
  <div>
    <p>爸爸的name:{{ name }}</p>
    <son :name.sync="name"></son>
  </div>
</template>

<script>
import Son from '@/components/sync/son';

export default {
  name: 'parent',
  components: { Son },
  data() {
    return {
      name: '苏菲娅',
    };
  },
  mounted() {
    setTimeout(()=> {
      this.name = '艾莎'
    }, 8000)
  }
};
</script>

<style scoped>

</style>
