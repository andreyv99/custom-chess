import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    password: new FormControl(null, Validators.required),
  });

  userRecognizingError$ = this.userSvc.userRecognizingError$;
  constructor(
    private authSvc: AuthService,
    public dialogRef: MatDialogRef<LogInComponent>,
    private userSvc: UserService
  ) {}

  onSubmit() {
    const status = this.authSvc.logInUser(this.logInForm.value);
    if (status) this.dialogRef.close();
  }
}
