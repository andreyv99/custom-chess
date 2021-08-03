import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    MatDialogModule,
    MatStepperModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  declarations: [
    HeaderComponent,
    LogInComponent,
    SignUpComponent,
    SidebarComponent,
  ],
  exports: [HeaderComponent, SidebarComponent, SignUpComponent],
})
export class CoreModule { }
