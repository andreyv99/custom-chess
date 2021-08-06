import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RoutePath } from 'src/app/shared/enums/route-path.enum';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"],
})
export class LogInComponent {
  logInForm = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  routePath = RoutePath;

  userRecognizingError$ = this.userSvc.userRecognizingError$;

  constructor(
    private authSvc: AuthService,
    public dialogRef: MatDialogRef<LogInComponent>,
    private userSvc: UserService,
    private notificationsSvc: NotificationsService
  ) { }

  onSubmit() {
    if (this.authSvc.logInUser(this.logInForm.value)) {
      this.closeDialog();
      this.notificationsSvc.showNotification('You\'ve successfully logged in', 'super', 1500, 'success-notification')
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
