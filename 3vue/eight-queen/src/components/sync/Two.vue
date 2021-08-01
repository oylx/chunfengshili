<template>
  <div>
    爸爸：{{ name2 }}
    <three :name2.sync="name2" @update:name2="x"></three>
  </div>
</template>

<script>
import Three from '@/components/sync/Three';
export default {
  name: 'Two',
  props: ['name1'],
  data() {
    return {
      name2: this.name1
    }
  },
  components: { Three },
  methods: {
    x(val) {
      console.log('爸爸收到更新',val);
      this.$emit('update:name1', val)
    }
  }
};
</script>

<style scoped>

</style>
