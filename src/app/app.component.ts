import { Component, OnInit } from '@angular/core';

import { EngineService } from './core/services/engine.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private engineService: EngineService) {}

  ngOnInit(): void {
    this.runWorker();
  }

  runWorker() {
    this.engineService.startEngine();
  }
}
