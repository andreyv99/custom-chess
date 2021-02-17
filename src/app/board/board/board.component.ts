import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { cellInterface, ChessmenStarterModel } from 'src/app/models/chessmen.models';

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  readonly cellAmount = 64;

  readonly cellLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  chessmenStarterModel = ChessmenStarterModel;

  cellIndexArr: number[];
  cellIndexArr1 = [
    {
      b: "sqwdf",
      a: ["wef"],
    },
    {
      b: "sdbbf",
      a: ["22"],
    },
    {
      b: "awd",
      a: ["354"],
    },
  ];

  cellsModel: cellInterface[];

  constructor() {}
  allDropLists: string[];
  ngOnInit(): void {
    this.cellIndexArr = Array.apply(null, { length: this.cellAmount }).map(
      (x, i) => ++i
    );

    this.cellsModel = Array.apply(null, {
      length: this.cellAmount,
    }).map((x, i) => this.getCellInfo(++i));
    this.allDropLists = [...this.cellsModel.map((_) => _.id)];
    console.log(this.cellsModel);
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
    console.log(this.allDropLists);
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
        event.currentIndex
      );
    }
  }
}
