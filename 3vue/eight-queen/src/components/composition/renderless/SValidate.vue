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
        let check = cur && cur.test && cur.test(this.value);
        this.errMsg = check ? '' : cur.message;
        return prev && check;
      }, true);
    },
  },
};
</script>

<style scoped>

</style>
