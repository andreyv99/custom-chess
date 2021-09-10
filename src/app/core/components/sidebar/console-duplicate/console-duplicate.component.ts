import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-console-duplicate",
  templateUrl: "./console-duplicate.component.html",
  styleUrls: ["./console-duplicate.component.scss"],
})
export class ConsoleDuplicateComponent implements OnInit {
  logs = [];
  constructor() {}
  ngOnInit(): void {
    console.log = (...args) => {
      this.logs.unshift(JSON.stringify(args));
    };
    console.warn = (...args) => {
      this.logs.unshift(JSON.stringify(args));
    };
    console.error = (...args) => {
      this.logs.unshift(args);
    };
  }
}
