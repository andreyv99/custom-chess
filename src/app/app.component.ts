import { Component } from '@angular/core';

import { EngineService } from './stockfish-engine/engine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private engineService: EngineService) {}
    runWorker() {
      this.engineService.startEngine();
    }
}
