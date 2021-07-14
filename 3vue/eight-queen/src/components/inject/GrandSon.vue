<template>
  <div></div>
</template>
<script>
export default {
  name: 'GrandSon',
  data() {
    return {};
  },
  inject: ['x'],
  mounted() {
    setTimeout(() => {
      this.x.top = 2000;
    });
    console.log('GrandSon,top', this.x.top);//20
    console.log('GrandSon,bottom', this.x.bottom);//30
  },
};
</script>
