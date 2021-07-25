import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/services/auth.service';
import { EngineService } from './core/services/engine.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private engineService: EngineService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.runWorker();
    this.authSvc.registerAdminFakeUser();
  }

  runWorker() {
    this.engineService.startEngine();
  }
}
