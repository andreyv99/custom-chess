import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board/board.component';
import { CellComponent } from './board/board/cell/cell.component';
import { CellDirective } from './directives/cell.directive';

@NgModule({
  declarations: [AppComponent, BoardComponent, CellComponent, CellDirective],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
