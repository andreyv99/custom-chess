import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  readonly cellAmount = 64;
  cellIndexArr: number[];

  constructor() {}

  ngOnInit(): void {
    this.cellIndexArr = Array.apply(null, { length: this.cellAmount }).map(
      (x, i) => ++i
    );
    console.log(this.cellIndexArr);
  }
}
