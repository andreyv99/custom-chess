import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { BoardComponent } from './components/board/board.component';
import { ChessmenComponent } from './components/chessmen/chessmen.component';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BoardComponent,
    ChessmenComponent,
    LogInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [HeaderComponent, BoardComponent],
})
export class CoreModule {}
