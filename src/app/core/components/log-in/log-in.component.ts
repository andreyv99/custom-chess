import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/shared/enums/route-path.enum';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

import { UserFormControlNameEnum } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  logInForm = new FormGroup({
    [UserFormControlNameEnum.userName]: new FormControl(
      null,
      Validators.required
    ),
    [UserFormControlNameEnum.password]: new FormControl(
      null,
      Validators.required
    ),
  });

  userFormControlNameEnum = UserFormControlNameEnum;
  routePath = RoutePath;

  userRecognizingError$ = this.userSvc.userRecognizingError$;

  constructor(
    private authSvc: AuthService,
    public dialogRef: MatDialogRef<LogInComponent>,
    private userSvc: UserService,
    private notificationsSvc: NotificationsService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.authSvc.logInUser(this.logInForm.value)) {
      this.closeDialog();
      this.notificationsSvc.showNotification(
        'You\'ve successfully logged in',
        'super',
        1500,
        'success-notification'
      );
      if (this.router.url.includes(this.routePath.signUp)) {
        this.router.navigateByUrl('');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
