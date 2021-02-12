import { Component } from '@angular/core';

import { EngineService } from './stockfish-engine/engine.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private engineService: EngineService) {}
  runWorker() {
    this.engineService.startEngine();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    console.log(ev);

    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
}
