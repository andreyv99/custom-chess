import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameZoneComponent } from './game-zone/game-zone.component';

const routes: Routes = [
  {
    path: '',
    component: GameZoneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
