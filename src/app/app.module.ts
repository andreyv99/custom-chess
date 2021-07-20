import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board/board.component';
import { ChessmenComponent } from './chessmen/chessmen.component';
import { ControlsComponent } from './controls/controls.component';
import { CellDirective } from './directives/cell.directive';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellDirective,
    ChessmenComponent,
    ControlsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
