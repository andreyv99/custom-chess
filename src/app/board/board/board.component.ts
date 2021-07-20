import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { cellInterface, ChessmenStarterModel } from 'src/app/models/chessmen.models';
import { BoardService } from 'src/app/services/board.service';
import { EngineService } from 'src/app/services/engine.service';

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent {
  readonly cellAmount = 64;

  readonly cellLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  chessmenStarterModel = ChessmenStarterModel;

  cellsModel: cellInterface[];
  allDropLists: string[];
  cellsModel$ = this.boardService.cellsModel$.pipe(
    tap((x) => {
      this.cellsModel = x;
      this.allDropLists = [...x.map((_) => _.id)];
    })
  );
  constructor(
    private engineService: EngineService,
    private boardService: BoardService
  ) {}

  checkIfChessmenNeeded(item: string[]): boolean {
    if (item.length === 0 || item[0].length === 0) {
      return false;
    } else {
      return true;
    }
  }

  getChessmenArr(arr: string[]): string[] {
    if (arr.length > 1) {
      arr.pop();
    }
    return arr;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0
      );

      this.engineService.moveByUser(
        event.previousContainer.id + event.container.id
      );
    }
  }
}
