import { Component, OnInit } from '@angular/core';

import { EngineService } from './core/services/engine.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private engineService: EngineService, private userSvc: UserService) { }

  ngOnInit(): void {
    this.runWorker();
    this.userSvc.registerAdminFakeUser();
  }

  runWorker() {
    this.engineService.startEngine();
  }
}
