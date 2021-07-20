import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { cellInterface, ChessmenStarterModel } from '../models/chessmen.models';

@Injectable({
  providedIn: "root",
})
export class BoardService {
  readonly cellAmount = 64;

  readonly cellLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  chessmenStarterModel = ChessmenStarterModel;

  cellsModelSubject = new BehaviorSubject<cellInterface[]>(
    this.getCellsModel()
  );

  cellsModel: cellInterface[];
  cellsModel$ = this.cellsModelSubject.asObservable();

  getCellsModel(): cellInterface[] {
    this.cellsModel = Array.apply(null, {
      length: this.cellAmount,
    }).map((x, i) => this.getCellInfo(++i));

    return this.cellsModel;
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

    this.cellsModelSubject.next(this.cellsModel);
  }
}
