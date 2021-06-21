<script>
export default {
  name: 'RouterView',
  render() {
    // 组件渲染
    const route = this._routerRoot._route;
    if (!route) {
      return;
    }
    const { component } = route;
    return <component />;
  },
};
</script>

<style scoped>

</style>
