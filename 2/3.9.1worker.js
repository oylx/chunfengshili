// Worker 内部如果要加载其他脚本，有一个专门的方法importScripts()。
// importScripts('script1.js');
// importScripts('script1.js', 'script2.js');

/**
 * Worker 线程内部需要有一个监听函数，监听message事件.self等同于this
 */
self.addEventListener('message', function (e) {
  const data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  }
}, false);
