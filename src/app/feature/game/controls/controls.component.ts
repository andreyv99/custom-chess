import { Component, OnInit } from '@angular/core';

import { BoardService } from '../services/board.service';
import { EngineService } from '../services/engine.service';

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styleUrls: ["./controls.component.scss"],
})
export class ControlsComponent implements OnInit {
  constructor(
    private boardService: BoardService,
    private engineService: EngineService
  ) { }

  ngOnInit(): void { }

  refreshBoard(): void {
    this.engineService.refreshGame();
    this.boardService.cellsModelSubject.next(this.boardService.getCellsModel());
  }
}
