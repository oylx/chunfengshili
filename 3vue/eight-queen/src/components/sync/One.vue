<template>
  <div>
    爷爷：{{ name1 }}
    <two :name1.sync="name1"></two>
  </div>
</template>

<script>
import Two from '@/components/sync/Two';
export default {
  name: 'One',
  components: { Two },
  data() {
    return {
      name1: '爷爷',
    };
  },
  mounted() {
    setTimeout(()=> {
      this.name1 = '爷爷'
    }, 1500)
  },
};
</script>

<style scoped>

</style>
