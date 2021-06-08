<template>
<div>
  <input type="text" @blur="blur">
  {{errMsg}}
</div>
</template>

<script>
import validateMixin from '@/mixin/validateMixin';
export default {
  name: 'SMixin',
  data: () => ({
    // errMsg: ''
  }),
  mixins: [validateMixin],
  methods: {
    validate() {
      console.log(1);
    },
    blur() {
      this.validate();
    }
  }
};
</script>

<style scoped>

</style>
