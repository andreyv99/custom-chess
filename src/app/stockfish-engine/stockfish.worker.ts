/// <reference lib="webworker" />
import * as stockfish from 'stockfish';

// const a = of(23);
// console.log(a.subscribe((a) => a));
const a = stockfish;
addEventListener("message", ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});
