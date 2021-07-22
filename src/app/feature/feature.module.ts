import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ControlsComponent } from './components/controls/controls.component';

@NgModule({
  declarations: [ControlsComponent],
  imports: [CommonModule],
  exports: [ControlsComponent],
})
export class FeatureModule {}
