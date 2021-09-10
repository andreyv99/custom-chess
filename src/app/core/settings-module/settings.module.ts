import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
    MatInputModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
})
export class SettingsModule {}
