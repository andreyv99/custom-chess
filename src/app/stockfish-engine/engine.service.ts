import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class EngineService {
  engineWorker: Worker;

  startEngine() {
    this.engineWorker = new Worker("stockfish", {
      type: "module",
    });

    this.engineWorker.onmessage = (message) => {
      console.log(`Got message`, message.data);
    };

    this.engineWorker.postMessage("hello");
  }
}
