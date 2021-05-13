<template>
  <div>
    <div class="title">八皇后问题</div>
    <div class="grid">
      <div class="row" v-for="(row,r_index) in grids" :key="r_index">
        <div class="cell" v-for="cell in row" :key="cell.key">
          Q
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const grids = new Array(8).fill(1).map((_, r) => {
  return new Array(8).fill(1).map((_, c) => {
    return {
      key: `key-${r * 8 + c}`,
      ok: false,
    };
  });
});
export default {
  name: 'EightQueen',
  data() {
    return {
      grids,
    };
  },
};
</script>

<style scoped>

</style>
