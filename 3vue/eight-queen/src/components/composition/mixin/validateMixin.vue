<script>
export default {
  name: 'validateMixin',
  data: () => ({
    errMsg: 'error'
  }),
  methods: {
    validate() {
      console.log(2);
      return true;
    }
  }
};
</script>

<style scoped>

</style>
