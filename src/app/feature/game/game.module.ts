import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BoardComponent } from './board/chess-board/board.component';
import { ChessmenComponent } from './board/chessmen/chessmen.component';
import { ControlsComponent } from './controls/controls.component';
import { GameRoutingModule } from './game-routing.module';
import { GameZoneComponent } from './game-zone/game-zone.component';

@NgModule({
  declarations: [BoardComponent,
    ChessmenComponent,
    GameZoneComponent,
    ControlsComponent],
  imports: [
    CommonModule,
    DragDropModule,
    GameRoutingModule
  ]
})
export class GameModule { }
