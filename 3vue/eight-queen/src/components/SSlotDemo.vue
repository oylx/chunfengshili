<template>
  <div>
    <template>
      <div>
        <my-component>
          <template v-slot:default="{toParent: a,toParent2: b}">
            {{a.data2}}
            {{b.data2}}
          </template>
          <template v-slot:header="{headerData:c}">
            {{c.data2}}
          </template>
        </my-component>
      </div>
    </template>

    <s-load></s-load>
    <current-user>
      <!--      在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字-->
      <!--      slotProps可以用x/y/z等替代-->
      <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </current-user>
    <!--    注意默认插槽的 缩写语法 不能和具名插槽混用，因为它会导致作用域不明确：-->
<!--    <current-user v-slot="slotProps">-->
<!--      {{ slotProps.user.firstName }}-->
<!--      <template v-slot:other="otherSlotProps">-->
<!--        slotProps is NOT available here-->
<!--      </template>-->
<!--    </current-user>-->
    <current-user>
      <!--      可以简写为<template #default="slotProps">-->
      <template #default="{ user: { lastName } }">
        {{ lastName }}
      </template>

      <template v-slot:other="otherSlotProps">
        {{ otherSlotProps.user.firstName }}
      </template>
    </current-user>
    <base-layout>
      <!--      v-slot 只能添加在 <template>-->
      <template v-slot:header>
        <span>header</span>
      </template>
      <!--      废弃slot属性-->
      <!--      <h1 slot="header">Here might be a page title</h1>-->
      <span>main1.</span>
      <span>main2.</span>
      <template v-slot:footer>
        <span>footer</span>
      </template>
    </base-layout>
    <navigation-link url="/profile">
      <!-- 添加一个 Font Awesome 图标 -->
      <!--      <span class="fa fa-user"></span>-->
      <!--      slot-scope废弃-->
      <template slot-scope="user">
        Logged in as {{ user.name }}
      </template>
    </navigation-link>
  </div>
</template>

<script>

import NavigationLink from '@/components/slot/NavigationLink';
import BaseLayout from '@/components/slot/BaseLayout';
import CurrentUser from '@/components/slot/CurrentUser';
import SLoad from '@/components/SLoad';
import MyComponent from '@/components/slot/MyComponent';

export default {
  name: 'SSlotDemo',
  components: {
    MyComponent,
    SLoad,
    CurrentUser,
    BaseLayout,
    NavigationLink,
  },
};
</script>

<style scoped>

</style>
