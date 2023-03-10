<template>
  <div class="accessory-list-wrap">
    <div class="accessory-list col-4">
      <ul>
        <li v-for="(item,index) in goods" :key="index">
          <div class="pic">
            <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
          </div>
          <div class="main">
            <div class="name">{{ item.productName }}</div>
            <div class="price">{{ item.salePrice }}</div>
            <div class="btn-area">
              <a href="javascript:;" class="btn btn--m">加入购物车</a>
            </div>
          </div>
        </li>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SInfiniteScroll',
  data() {
    return {
      busy: true,
      page: 1,
      pageSize: 8,
    }
  },
  methods: {
    getGoodsList(flag) {
      let param = {
        priceLevel: this.priceChecked,
        page: this.page,
        pageSize: this.pageSize
      }
      axios.get('/goods/list', { params: param }).then(res => {
        if (flag) {
          // 多次加载数据
          this.goods = this.goods.concat(res.data.result)
          if (res.data.result.length == 0) {
            this.busy = true
          } else {
            this.busy = false
          }
        } else {
          // 第一次加载数据
          this.goods = res.data.result
          // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
          this.busy = false
        }
      })
    },
    loadMore: function () {
      this.busy = true
      // 多次加载数据
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
