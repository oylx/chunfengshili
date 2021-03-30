const worker = new Worker("3.9.1worker.js")
worker.onmessage = function (e) {
  console.log('work info message', e);
  worker.postMessage('message got')
}
// 解决通电：js执行负责运算时阻塞了页面渲染
// 使用场景：复杂运算，渲染优化，流媒体数据处理 offCanvas




