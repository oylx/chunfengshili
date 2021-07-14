<template>
  <div>
    <grand-son></grand-son>
  </div>
</template>
<script>
import GrandSon from '@/components/inject/GrandSon';

export default {
  name: 'Son',
  components: { GrandSon },
  data() {
    return {};
  },
  inject: ['x'],
  mounted() {
    console.log('son,top', this.x.top);//20
  },
};
</script>
