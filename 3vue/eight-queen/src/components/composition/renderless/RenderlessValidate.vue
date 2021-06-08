<template>
  <s-validate #default="{ validate }" :value="value" :rules="rules">

  </s-validate>
</template>

<script>
import SValidate from '@/components/composition/renderless/SValidate';
export default {
  name: 'RenderlessValidate',
  components: { SValidate },
};
</script>

<style scoped>

</style>
