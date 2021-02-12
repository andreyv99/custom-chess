import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board/board.component';
import { CellComponent } from './board/board/cell/cell.component';
import { CellDirective } from './directives/cell.directive';
import { ChessmenComponent } from './chessmen/chessmen.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, CellComponent, CellDirective, ChessmenComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
