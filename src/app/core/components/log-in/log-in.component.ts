import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  logInForm = new FormGroup({
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  userRecognizedSubject = new BehaviorSubject(false)
  userRecognized$ = this.userRecognizedSubject.asObservable();

  constructor(private userSvc: UserService, public dialogRef: MatDialogRef<LogInComponent>) { }

  onSubmit() {
    const status = this.userSvc.logInUser(this.logInForm.value);
    this.userRecognizedSubject.next(!status)
    if (status) this.dialogRef.close()
  }
}
2
