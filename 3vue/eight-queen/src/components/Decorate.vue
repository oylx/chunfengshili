<template>
  <div>
    <div>
      <span>lazy:</span>
      <!-- 这样只有当我们光标离开输入框的时候，它才会更新视图，相当于在onchange事件触发更新。     -->
      <input type="text" v-model.lazy="value">
      <p>{{ value }}</p>
    </div>
    <div>
      <!-- 过滤首尾的空格！首尾，中间的是不会过滤的    -->
      <span>trim:</span>
      <input type="text" v-model.trim="value">
    </div>
    <div>
      <!--      如果你先输入数字，那它就会限制你输入的只能是数字。-->
      <!--      如果你先输入字符串，那它就相当于没有加.number-->
      <span>number:</span>
      <input type="text" v-model.number="value">
    </div>
    <div @click="shout(2)">
      <button @click="shout(1)">正常</button>
    </div>
    <div @click="shout(2)">
      <!-- 一键阻止事件冒泡，简直方便得不行。相当于调用了event.stopPropagation()方法-->
      <button @click.stop="shout(1)">阻止冒泡</button>
    </div>
    <div>
      <!-- 注意：修饰符可以同时使用多个,但是可能会因为顺序而有所不同。-->
      <!-- 用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。-->
      <!-- 也就是从左往右判断~-->
      <!-- 用于阻止事件的默认行为，例如，当点击提交按钮时阻止对表单的提交。相当于调用了event.preventDefault()方法 -->
      <form v-on:submit.prevent="onSubmit"></form>
    </div>
    <div>
      <!-- 只当事件是从事件绑定的元素本身触发时才触发回调。像下面所示，-->
      <!-- 刚刚我们从.stop时候知道子元素会冒泡到父元素导致触发父元素的点击事件，-->
      <!-- 当我们加了这个.self以后，我们点击button不会触发父元素的点击事件shout，-->
      <!-- 只有当点击到父元素的时候（蓝色背景）才会shout~从这个self的英文翻译过来就是‘自己，本身’可以看出这个修饰符的用法-->
      <div class="blue" @click.self="shout(2)">
        <button @click="shout(1)">ok</button>
      </div>
    </div>

    <div>
      <input id="uid" title="title1" value="1" :index="index">
    </div>
    <div>
      <!--  键盘按坏都只能shout一次-->
      <button @click.once="shout(1)">ok</button>
    </div>

<!--    <div>-->
<!--      <svg :viewBox="viewBox"></svg>-->
<!--    </div>-->

    <!--    完整的事件机制是：捕获阶段--目标阶段--冒泡阶段。
    默认的呢，是事件触发是从目标开始往上冒泡。
    当我们加了这个.capture以后呢，我们就反过来了，事件触发从包含这个元素的顶层开始往下触发-->
    <!--  obj1，obj2在捕获阶段就触发了事件，因此是先1后2，
          后面的obj3，obj4是默认的冒泡阶段触发，因此是先4然后冒泡到3~  -->
    <div @click.capture="shout(1)">
      obj1
      <div @click.capture="shout(2)">
        obj2
        <div @click="shout(3)">
          obj3
          <div @click="shout(4)">
            obj4
          </div>
        </div>
      </div>
    </div>

    <!-- 当我们在监听元素滚动事件的时候，会一直触发onscroll事件，在pc端是没啥问题的，
    但是在移动端，会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给onscroll事件整了一个.lazy修饰符   -->
    <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
    <!-- 而不会等待 `onScroll` 完成  -->
    <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <div v-on:scroll.passive="onScroll" class="content bd">
      <p v-html="content"></p>
    </div>

    <div class="bd">
      <!-- 必须使用.native来修饰这个click事件（即<s-radio @click.native="shout(3)"></s-radio>），
      可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签，
      注意：使用.native修饰符来操作普通HTML标签是会令事件失效的     -->
      <s-radio @click.native="shout(3)"></s-radio>
    </div>

    <div>
      <!--  鼠标按钮修饰符    -->
      <!--  普通键.enter .tab. delete(捕获“删除”和“退格”键)  .space .esc  .up .down .left .right-->
      <!--  系统修饰键 .ctrl .alt  .meta .shift-->

      <button @click.left="shout('left')">left</button>
      <button @click.right="shout('right')">right</button>
      <button @click.middle="shout('middle')">middle</button>


    </div>

    <div>
      <!-- 键值修饰符     -->
      <!-- keyCode	实际键值-->
      <!-- 48到57	0到9-->
      <!-- 65到90	a到z（A到Z）-->
      <!-- 112到135	F1到F24-->
      <!-- 8	BackSpace（退格）-->
      <!-- 9	Tab-->
      <!-- 13	Enter（回车）-->
      <!-- 20	Caps_Lock（大写锁定）-->
      <!-- 32	Space（空格键）-->
      <!-- 37	Left（左箭头）-->
      <!-- 38	Up（上箭头）-->
      <!-- 39	Right（右箭头）-->
      <!-- 40	Down（下箭头）-->
      <input type="text" @keyup.alt.67="shout('我被触发了')" value="12" />
      <button type="text" @click.ctrl.exact="shout(4)">ok</button>
    </div>

    <div>
      <!-- 如果是在自己封装的组件或者是使用一些第三方的UI库时，会发现并不起效果，这时就需要用到.native修饰符了，
           如果遇到.native修饰符也无效的情况，可能就需要用到$listeners了-->
      <!--      <el-input-->
      <!--        v-model="inputName"-->
      <!--        placeholder="搜索你的文件"-->
      <!--        @keyup.enter.native="searchFile(params)"-->
      <!--      >-->
      <!--      </el-input>-->
    </div>

    <div>
      <!--  使用sync的时候，子组件传递的事件名必须为update:value，其中value必须与子组件中props中声明的名称完全一致(如上例中的myMessage，不能使用my-message)
            注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-model。
            将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。    -->
      <!--      父组件-->
      <!--      <comp :myMessage.sync="bar"></comp>-->
      <!--      子组件-->
      <!--      this.$emit('update:myMessage',params);-->
    </div>

    <div>

    </div>

  </div>
</template>

<script>
import SRadio from '@/components/SRadio';
export default {
  name: 'Decorate',
  components: { SRadio },
  data() {
    return {
      value: '',
      index: 1,
      content: ''
    };
  },
  methods: {
    shout(e) {
      console.log(e);
    },
    onSubmit() {
      console.log('阻止默认行为');
    },
    onScroll() {
      console.log('滚动');
    },
    createContent() {
      for(let i=0;i<50;i++) {
        this.content += '<p>hi</p>'
      }
    },
    testInputAttr() {
      // 如果直接使用v-bind绑定，则默认会绑定到dom节点的attribute
      // <input id="uid" title="title1" value="1" :index="index">
      // input.index === undefined
      // input.attributes.index === this.index
      // 为了通过自定义属性存储变量，避免暴露数据,防止污染 HTML 结构,我们可以使用这个修饰符prop，如下
      // <input id="uid" title="title1" value="1" :index.prop="index">
      // input.index === this.index
      // input.attributes.index === undefined
      const input = document.getElementById('uid');
      const { attributes, index, } = input.attributes;
      console.log(index, attributes);
    }
  },
  mounted() {
    this.testInputAttr()
    this.createContent()
  },
};
</script>

<style scoped>
.blue {
  background: blue;
}
.bd{
  border: 1px solid #000;
}
.content{
  height: 50px;
  overflow: scroll;
}
</style>
