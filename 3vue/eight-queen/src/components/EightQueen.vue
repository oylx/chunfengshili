<template>
  <div>
    <div class="title">八皇后问题</div>
    <div class="grid">
      <div class="row" v-for="(row,r_index) in grids" :key="r_index">
        <div class="cell" v-for="(cell, c_index) in row" :key="cell.key" @click.stop="select(r_index,c_index)">
          {{ cell.ok ? 'o' : null }}
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
  methods: {
    select(rindex, cindex) {
      if(this.validate(rindex, cindex)){
        this.grids[rindex][cindex].ok = true;
      }else {
        alert('不行哦')
      }
    },
    validate(rindex, cindex) {
      for (let i = 0; i < this.grids[rindex].length; i++) {
        for (let j = 0; j < this.grids[cindex].length; j++) {
          if (this.grids[i][j].ok) {
            if (i === rindex || j === cindex || (cindex - j) / (rindex - i) === 1 || (cindex - j) / (rindex - i) === -1) {
              return false;
            }
          }
        }
      }
      return true
    },
  },
};
</script>

<style lang="less" scoped>
@grey: #999999;
@white: #efefef;
.grid {
  width: 400px;
  margin: 0 auto;

  .row {
    width: 400px;
    height: 50px;
    display: flex;

    .cell {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: @grey;
    }

    .cell:nth-child(2n) {
      background: @white;
    }
  }

  .row:nth-child(2n) .cell:nth-child(2n) {
    background: @grey;
  }

  .row:nth-child(2n) .cell:nth-child(2n-1) {
    background: @white;
  }
}
</style>
