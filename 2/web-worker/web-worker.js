const worker = new Worker('work.js');
worker.postMessage({method: 'echo', args: ['Work']});
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
