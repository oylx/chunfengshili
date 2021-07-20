<template>
  <div class="scroll-wrapper">
    <div class="top-wrapper" ref="topWrapper">
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
      <p>9</p>
      <p>10</p>
    </div>
    <ul :class=" onTop > topWrapperHeight ? 'fixed' : 'static'">
      <li v-for="(item, index) in btns" :key="`index-${index}`">
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <ol class="content">
      <li v-for="(item, index) in contentArr" :key="`content-${index}`">
        <div v-html="item"></div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'SScroll',
  data() {
    const contentArr = new Array(4).fill('').map((item, index) => (new Array(50).fill(`<p>${index + 1}</p>`).join('')));
    return {
      onTop: 0,
      scrollHeight: 0,
      contentArr,
      topWrapperHeight: 0,
      btns: [
        {
          name: 'default',
          trigger: 'click',
        },
        {
          name: 'primary',
          trigger: 'click',
        },
        {
          name: 'success',
          trigger: 'click',
        },
        {
          name: 'error',
          trigger: 'click',
        },
      ],
    };
  },
  methods: {
    scrollListenerCb() {
      this.scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    },
  },
  watch: {
    scrollHeight(val) {
      this.onTop = val;
    },
  },
  mounted() {
    this.topWrapperHeight = this.$refs.topWrapper.clientHeight || 0
    window.addEventListener('scroll', this.scrollListenerCb);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListenerCb);
  },
};
</script>

<style scoped lang="less">
.scroll-wrapper {

  .fixed {
    position: fixed;
    top: 0;
    left: 0;
  }
  //.static {
  //  position: relative;
  //}

  .content {
  }

  ul {
    list-style: none;
    display: flex;

    li {
      list-style: none;
      border: 1px solid #000;
      margin-right: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }

}
</style>
