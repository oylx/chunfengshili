<template>
  <div class="ye">
    我是爷组件
    <h3>{{ fromSunData }}</h3>
    <fu :msg1="msg1" :msg2="msg2" :msg3="msg3" :msg4="msg4"
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
      msg1: "孙悟空",
      msg2: "猪八戒",
      msg3: ["白骨精", "玉兔精", "狐狸精"],
      msg4: {
        name: "炎帝萧炎",
        book: "斗破苍穹",
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
