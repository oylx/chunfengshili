<template>
  <div>
    <h2>默认插槽</h2>
    <slot :toParent="childrenData" :toParent2="childrenData2">
      {{childrenData.data1}}
      {{childrenData2.data1}}
    </slot>
    <h2>头部插槽</h2>
    <slot name="header" :headerData="headerData">
      {{headerData.data1}}
    </slot>
  </div>
</template>
<script>
export default{
  name: 'MyComponent',
  data(){
    return{
      childrenData:{
        data1:'子组件数据一',
        data2:'子组件数据二',
      },
      childrenData2:{
        data1:'子组件数据三',
        data2:'子组件数据四',
      },
      headerData:{
        data1:'子组件头部数据一',
        data2:'子组件头部数据二',
      },
    }
  },
}
</script>
