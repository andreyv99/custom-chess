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
  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    console.log(ev);

    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
}
