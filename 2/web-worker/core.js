let start;
onmessage = getStart;

function getStart(event) {
  start = event.data;
  onmessage = getEnd;
}

let end;

function getEnd(event) {
  end = event.data;
  onmessage = null;
  work();
}

function work() {
  let result = 0;
  for (let i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  postMessage(result);
  close();
}
