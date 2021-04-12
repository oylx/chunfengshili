// 解决痛点：js执行负责运算时阻塞了页面渲染
// 使用场景：复杂运算，渲染优化，流媒体数据处理 offCanvas

// Web Worker 有以下几个使用注意点。
// （1）同源限制:分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
// （2）DOM 限制:Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。
// （3）通信联系:Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
// （4）脚本限制:Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
// （5）文件限制:Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

// 1.主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程。
const worker = new Worker("3.9.1worker.js")

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}

/**
 * 2.主线程调用worker.postMessage()方法，向 Worker 发消息,worker.postMessage()方法的参数，就是主线程传给 Worker 的数据。它可以是各种数据类型，包括二进制数据
 */
worker.postMessage({method: 'echo', args: ['Work']});

/**
 * 3.主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息
 * @param event
 */
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

/**
 * 4.主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。
 */
worker.onerror(function(e) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});


// 主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。
// 需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。
// 事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

// 主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型，也可以在线程之间发送。下面是一个例子。
// 主线程
// var uInt8Array = new Uint8Array(new ArrayBuffer(10));
// for (var i = 0; i < uInt8Array.length; ++i) {
//   uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
// }
// worker.postMessage(uInt8Array);

// Worker 线程
// self.onmessage = function (e) {
//   var uInt8Array = e.data;
//   postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString());
//   postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength);
// };

// 拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。
// 为了解决这个问题，JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，
// 这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做Transferable Objects。
// 这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。
// 如果要直接转移数据的控制权，就要使用下面的写法

// Transferable Objects 格式
// worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
// var ab = new ArrayBuffer(1);
// worker.postMessage(ab, [ab]);



