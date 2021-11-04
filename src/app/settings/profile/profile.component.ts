import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { SignUpService } from 'src/app/core/services/sign-up.service';
import { Cities, Countries } from 'src/app/shared/hardcode/address';
import { GameLevel } from 'src/app/shared/hardcode/game-level';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

import { UserFormControlNameEnum, userInterface } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  form: FormGroup;
  userFormControlNameEnum = UserFormControlNameEnum;
  oldUserName: string;
  user$ = this.userSvc.user$.pipe(
    tap((user) => {
      this.oldUserName = user.name.userName;
      this.buildForm(user);
    })
  );

  countries = Countries;
  cities = Cities;
  gameLevels = GameLevel;

  citiesSubject: BehaviorSubject<any>;
  cities$: Observable<any>;

  get countryControl(): FormControl {
    return this.form.get([
      this.userFormControlNameEnum.address,
      this.userFormControlNameEnum.country,
    ]) as FormControl;
  }

  get postalCodeControl(): FormControl {
    return this.form.get([
      this.userFormControlNameEnum.address,
      this.userFormControlNameEnum.postalCode,
    ]) as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get([
      this.userFormControlNameEnum.password,
    ]) as FormControl;
  }

  get birthDateControl(): FormControl {
    return this.form.get([
      this.userFormControlNameEnum.birthDate,
    ]) as FormControl;
  }

  errorMatcher = new MyErrorStateMatcher();

  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private localStorageSvc: LocalStorageService,
    private sessionStorageSvc: SessionStorageService,
    private signUpSvc: SignUpService,
    private authSvc: AuthService,
    private notificationSvc: NotificationsService
  ) { }

  buildForm(user: userInterface): void {
    this.form = this.fb.group({
      [this.userFormControlNameEnum.name]: this.fb.group({
        [this.userFormControlNameEnum.firstName]: [
          user.name[this.userFormControlNameEnum.firstName],
          [Validators.required, Validators.maxLength(120)],
        ],
        [this.userFormControlNameEnum.lastName]: [
          user.name[this.userFormControlNameEnum.lastName],
          [Validators.required, Validators.maxLength(120)],
        ],
        [this.userFormControlNameEnum.userName]: [
          user.name[this.userFormControlNameEnum.userName],
          Validators.required,
        ],
      }),
      [this.userFormControlNameEnum.address]: this.fb.group({
        [this.userFormControlNameEnum.country]: [
          user.address.country,
          Validators.required,
        ],
        [this.userFormControlNameEnum.city]: [
          user.address.city,
          Validators.required,
        ],
        [this.userFormControlNameEnum.postalCode]: [
          user.address.postalCode,
          Validators.required,
        ],
      }),
      [this.userFormControlNameEnum.email]: [
        user.email,
        [Validators.required, Validators.email],
      ],
      [this.userFormControlNameEnum.number]: [user.number, Validators.required],

      [this.userFormControlNameEnum.password]: [
        user.password,
        [Validators.required, this.passwordValidator()],
      ],
      [this.userFormControlNameEnum.birthDate]: [
        new Date(user.birthDate),
        [Validators.required, this.birthDateValidator()],
      ],
      [this.userFormControlNameEnum.gameLevel]: user.gameLevel,
    });
    this.setUpSelectInputs();
    this.listenControlChanges();
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = new RegExp(
        "^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$"
      );

      const invalidPassword = control.value
        ? !regex.test(control.value)
        : false;
      return invalidPassword
        ? { invalidPassword: { value: control.value } }
        : null;
    };
  }

  birthDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidDate = control.value
        ? control.value.getTime() > new Date().getTime()
        : false;
      return invalidDate ? { invalidDate: { value: control.value } } : null;
    };
  }

  setUpSelectInputs() {
    this.citiesSubject = new BehaviorSubject(
      this.cities[this.countryControl.value]
    );
    this.cities$ = this.citiesSubject.asObservable();
  }

  listenControlChanges() {
    this.countryControl.valueChanges.subscribe((country) => {
      this.citiesSubject.next(this.cities[country]);
    });
  }

  onSubmit() {
    try {
      this.localStorageSvc.removeItem(this.oldUserName);
      this.localStorageSvc.removeItem("user-" + this.oldUserName);
      this.sessionStorageSvc.removeItem(this.oldUserName);
      this.sessionStorageSvc.removeItem("user-" + this.oldUserName);

      this.signUpSvc.signUpUser({ profileIsFull: true, ...this.form.value });
      this.authSvc.logInUser({
        userName: this.form.value.name.userName,
        password: this.form.value.password,
      });

      this.notificationSvc.showNotification('Data was successfully saved!', 'Super!', 1500, 'success-notification');
    } catch {
      this.notificationSvc.showNotification('Sorry! We have a problems with updating your profile', 'OMG!');
    }
  }
}
