import { Component } from '@angular/core';
import * as stockfish from 'stockfish';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  stockfish = stockfish;
  runWorker() {
    // let a = stockfish;
    const demoWorker = new Worker("stockfish", {
      type: "module",
    });

    demoWorker.onmessage = (message) => {
      console.log(`Got message`, message.data);
    };

    demoWorker.postMessage("hello");
  }
}
