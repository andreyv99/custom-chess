import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';

@NgModule({
  declarations: [
    SettingsComponent,
    UserOverviewComponent,
    ProfileComponent,
    GameComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
