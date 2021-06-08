<template>
  <div>
    <slot :validate="validate"></slot>
    {{ errMsg }}
  </div>
</template>

<script>
export default {
  name: 'SValidate',
  props: ['value', 'rules'],
  data() {
    return {
      errMsg: '',
    };
  },
  methods: {
    validate() {
      return this.rules.reduce((prev, cur) => {
        return prev && cur && cur.test && cur.test(this.value);
      }, true);
    },
  },
};
</script>

<style scoped>

</style>
