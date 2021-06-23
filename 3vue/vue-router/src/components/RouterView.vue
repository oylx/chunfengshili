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
    const hook = {
      init(vnode) {
        route.instance  = vnode.componentInstance
        console.log('instance', vnode);
        console.log('instance', vnode);
      }
    }
    return <component />;
  },
};
</script>

<style scoped>

</style>
