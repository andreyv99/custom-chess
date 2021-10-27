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
import { Cities, Countries } from 'src/app/shared/hardcode/address';
import { GameLevel } from 'src/app/shared/hardcode/game-level';

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  form: FormGroup;
  userFormControlNameEnum = UserFormControlNameEnum;
  user$ = this.userSvc.user$.pipe(
    tap((user) => {
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
      this.userFormControlNameEnum.password
    ]) as FormControl;
  }

  errorMatcher = new MyErrorStateMatcher();

  constructor(private userSvc: UserService, private fb: FormBuilder) { }

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
        ]
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
        user.birthDate,
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
        '^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$'
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
    console.log(this.form.value);
  }
}
