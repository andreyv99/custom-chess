import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/services/auth.service';
import { SessionStorageService } from './core/services/session-storage.service';
import { EngineService } from './feature/game/services/engine.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private engineService: EngineService,
    private authSvc: AuthService,
    private sessionStrSvc: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.runWorker();
    this.authSvc.registerAdminFakeUser();
  }

  runWorker() {
    this.engineService.startEngine();
  }
}
