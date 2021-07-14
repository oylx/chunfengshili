<template>
  <div>
    {{ top }}
    <son></son>
  </div>
</template>
<script>
import Son from '@/components/inject/Son';

export default {
  name: 'GrandParent',
  components: { Son },
  data() {
    return {
      top: 20,
    };
  },
  provide() {
    return {
      x: this,
    };
  },

};
</script>
