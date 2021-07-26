import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-chessmen",
  templateUrl: "./chessmen.component.html",
  styleUrls: ["./chessmen.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChessmenComponent implements OnInit {
  @Input() imageName: string;
  @Input() id: string;

  imageUrl: string;
  constructor() {}

  ngOnInit(): void {
    this.imageUrl = "assets/images/" + this.imageName;
  }
}
