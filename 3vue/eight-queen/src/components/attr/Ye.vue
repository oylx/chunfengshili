<template>
  <div class="ye">
    我是爷组件
    <h3>{{ fromSunData }}</h3>
    <fu :visible="visible" :msg2="msg2" :msg3="msg3" :msg4="msg4"
        @fromSun="fromSun">
    </fu>
  </div>
</template>

<script>
import fu from "./Fu";
export default {
  components: {
    fu,
  },
  data() {
    return {
      visible: "1=========孙悟空=====",
      msg2: "2猪八戒",
      msg3: ["3白骨精", "3玉兔精", "3狐狸精"],
      msg4: {
        name: "4炎帝萧炎",
        book: "4斗破苍穹",
      },
      showComponent: false,
      fromSunData: "",
    };
  },
  methods: {
    fromSun(payload) {
      console.log("孙传祖", payload);
      this.fromSunData = payload;
    },
  },
};
</script>
<style lang="less" scoped>
.ye {
  width: 950px;
  height: 600px;
  box-sizing: border-box;
  border: 3px dashed #e9e9e9;
  background-color: #cde;
  margin: 50px;
}
</style>
