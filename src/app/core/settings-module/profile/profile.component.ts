import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { UserFormControlNameEnum, userInterface } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  userFormControlNameEnum = UserFormControlNameEnum;
  user$ = this.userSvc.user$.pipe(
    tap((user) => {
      this.buildForm(user);
    })
  );
  constructor(private userSvc: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  buildForm(user: userInterface): void {
    this.form = this.fb.group({
      [this.userFormControlNameEnum.name]: user.name.firstName,
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
