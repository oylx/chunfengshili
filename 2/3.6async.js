// async 返回值是promise，return的值是promise的value
async function test0() {
  return 1;
}

const runTest0 = () => {
  const p = test0();
  console.log(p); // promise
  p.then((data) => {
    console.log('runTest0');
    console.log(data);
  });
}

// runTest0();

const runTest1 = async () => {
  let a = await test0();
  console.log('runTest1');
  console.log(a);
}

// runTest1();

const test2 = async () => {
  throw new Error('自定义错误');
}

const testTest2 = () => {
  const p = test2()
  console.log(p);
  p.catch((data) => {
    console.log(data);
  })
}
testTest2()
