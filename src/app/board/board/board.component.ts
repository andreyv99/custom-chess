import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { cellInterface, ChessmenStarterModel } from 'src/app/models/chessmen.models';
import { EngineService } from 'src/app/stockfish-engine/engine.service';

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  readonly cellAmount = 64;

  readonly cellLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  chessmenStarterModel = ChessmenStarterModel;

  cellsModel: cellInterface[];
  allDropLists: string[];

  constructor(private engineService: EngineService) {}

  ngOnInit(): void {
    this.cellsModel = Array.apply(null, {
      length: this.cellAmount,
    }).map((x, i) => this.getCellInfo(++i));

    this.allDropLists = [...this.cellsModel.map((_) => _.id)];

    this.engineService.moveByEngine.subscribe((move) => {
      console.log(move);
      this.makeMoveByEngine(move);
    });
  }

  makeMoveByEngine(move: string): void {
    const startPos = move.slice(0, 2);
    const endPos = move.slice(2, 4);
    const chessmenImgArr: string[] = [];

    for (const item of this.cellsModel) {
      if (item.id === startPos) {
        chessmenImgArr.push(item.imgName[0]);
        item.imgName = [];
      }
    }

    for (const item of this.cellsModel) {
      if (item.id === endPos) {
        item.imgName = chessmenImgArr;
      }
    }
    console.log(this.cellsModel);
  }

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

  private getCellInfo(index: number): cellInterface {
    const result: any = {};
    let row: number;
    const idGenerator = this.getCellId(index);

    row = idGenerator.next().value;
    result.id = idGenerator.next().value;
    result.color = this.getCellColor(row, index);
    result.imgName = this.getImageName(result.id);

    return result;
  }

  private getImageName(id: string): string[] {
    const result = this.chessmenStarterModel[id]
      ? this.chessmenStarterModel[id].imgName
      : "";
    return [result];
  }

  private *getCellId(index: number): Generator {
    const row = Math.ceil(index / 8);
    const letterId = index - 8 * (row - 1) - 1;
    const letter = this.cellLetterArr[letterId];

    yield row;
    return letter + row;
  }

  private getCellColor(row: number, index: number): string {
    const rowIsOdd = this.checkIfOdd(row);
    const cellIsOdd = this.checkIfOdd(index);
    if (rowIsOdd) {
      if (cellIsOdd) {
        return "black";
      } else {
        return "white";
      }
    } else {
      if (cellIsOdd) {
        return "white";
      } else {
        return "black";
      }
    }
  }

  private checkIfOdd(num: number): boolean {
    return num % 2 === 1;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this.cellsModel);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0
      );
    }

    this.engineService.moveByUser(
      event.previousContainer.id + event.container.id
    );
  }
}
