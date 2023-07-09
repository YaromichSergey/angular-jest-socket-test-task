/// <reference lib="webworker" />

import { generatePseudoData } from './utils/worker.utils';

let interval: any;

addEventListener('message', ({ data }) => {
  clearInterval(interval);
  startPseudoSocket(data.timer, data.arraySize, data.additionalIds);
});

function startPseudoSocket(timer: number, arraySize: number, additionalIds: string[]) {
  interval = setInterval(function() {
    const data = generatePseudoData(arraySize, additionalIds);
    postMessage(data);
  }, timer);
}
