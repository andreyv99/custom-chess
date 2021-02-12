import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChessmenStarterModel } from 'src/app/models/chessmen.models';

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnInit, AfterViewInit {
  @Input() index: number;
  @ViewChild("elem") elem: ElementRef;

  chessmenStarterModel = ChessmenStarterModel;
  cellId: string;
  row: number;

  readonly cellLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.cellId = this.getCellId(this.index);
  }

  ngAfterViewInit(): void {
    const rowIsOdd = this.checkIfOdd(this.row);
    const cellIsOdd = this.checkIfOdd(this.index);
    if (rowIsOdd) {
      if (cellIsOdd) {
        this.setCellClass("black");
      } else {
        this.setCellClass("white");
      }
    } else {
      if (cellIsOdd) {
        this.setCellClass("white");
      } else {
        this.setCellClass("black");
      }
    }
  }

  getCellId(index: number): string {
    this.row = Math.ceil(index / 8);
    const letterId = index - 8 * (this.row - 1) - 1;
    const letter = this.cellLetterArr[letterId];

    return letter + this.row;
  }

  private checkIfOdd(num: number): boolean {
    return num % 2 === 1;
  }

  private setCellClass(cssClass: string): void {
    this.renderer.addClass(this.elem.nativeElement, cssClass);
  }

  drag(ev) {
    console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    console.log(ev);

    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log(document.querySelector(`[a-id="${data}"]`));
    ev.target.appendChild(document.querySelector(`[a-id="${data}"]`));
  }
}
