<template>
  <div @click="getJsonpData">点击，发送请求</div>
</template>

<script>
export default {
  name: 'SJsonp',
  methods: {
    baiduTest() {
      // 新浪测试
      const params = { wd: 1 }
      const url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su'
      this.jsonp(url, params).then(data => {
        // 处理拿到数据后的回掉callback,你只要在这里写具体处理方法就行了
        console.log(data)
      })
    },
    sinaTest() {
      // 新浪测试
      const params = { page: 1, cate: 'recommend' }
      const url = 'https://photo.sina.cn/aj/index'
      this.jsonp(url, params).then(data => {
        // 处理拿到数据后的回掉callback,你只要在这里写具体处理方法就行了
        console.log(data)
      })
    },
    yourTest() {
      // 这个是你的测试,对比下
      // const searchId = 0.42624782524561566
      // const params1 = { id: searchId, }
      // const url1 = 'http://172.17.226.54/getaverage'
      // this.jsonp(url1, params1).then(data => {
      //   // 处理拿到数据后的回掉callback,你只要在这里写具体处理方法就行了
      //   console.log(data)
      // })
    },
    getJsonpData() {
      this.sinaTest()
      // this.yourTest()
      // this.baiduTest()
    },
    jsonp(url, data = {}, callback = 'callback') {
      // 转化数据为url字符串形式
      let dataStr = url.indexOf('?') === -1 ? '?' : '&'
      for (let key in data) {
        dataStr += `${key}=${data[key]}&`
      }
      // 处理url中的回调函数
      dataStr += 'callback=' + callback
      // 创建srcipt标签并添加src属性值
      let scriptBody = document.createElement('script')
      scriptBody.src = url + dataStr

      // append到页面中 添加到页面就立刻发起请求
      document.body.appendChild(scriptBody)
      //返回一个promise
      return new Promise((resolve, reject) => {
        window[callback] = (data) => {
          try {
            resolve(data)
          } catch (e) {
            reject(e)
          } finally {
            // 移除script元素
            // scriptBody.parentNode.removeChild(scriptBody)
            console.log(scriptBody)
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
