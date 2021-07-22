import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: "[appCell]",
})
export class CellDirective {
  @Input() index: number;

  row: number;

  readonly cellLetterArr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  constructor(private elem: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setCellId();
    this.setCellColor();
  }

  private setCellColor(): void {
    const rowIsOdd = this.checkIfOdd(this.row);
    const cellIsOdd = this.checkIfOdd(this.index);
    if (rowIsOdd) {
      if (cellIsOdd) {
        this.addCellClass("black");
      } else {
        this.addCellClass("white");
      }
    } else {
      if (cellIsOdd) {
        this.addCellClass("white");
      } else {
        this.addCellClass("black");
      }
    }
  }

  private setCellId(): void {
    this.row = Math.ceil(this.index / 8);
    const letterId = this.index - 8 * (this.row - 1) - 1;
    const letter = this.cellLetterArr[letterId];

    this.renderer.setAttribute(
      this.elem.nativeElement,
      "cell-id",
      letter + this.row
    );
    this.renderer.setProperty(
      this.elem.nativeElement,
      "innerHTML",
      letter + this.row
    ); // for development purpose
  }

  private checkIfOdd(num: number): boolean {
    return num % 2 === 1;
  }

  private addCellClass(cssClass: string): void {
    this.renderer.addClass(this.elem.nativeElement, cssClass);
  }
}
