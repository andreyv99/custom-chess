import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cities, Countries } from 'src/app/shared/hardcode/address';

import { UserFormControlNameEnum, userInterface } from '../../models/user.model';
import { UserService } from '../../services/user.service';

export class MyErrorStateMatcher {
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
  user$ = this.userSvc.user$.pipe(
    tap((user) => {
      this.buildForm(user);
    })
  );

  countries = Countries;
  cities = Cities;

  citiesSubject: BehaviorSubject<any>;
  cities$: Observable<any>;

  get countryControl(): FormControl {
    return this.form.get([
      this.userFormControlNameEnum.address,
      this.userFormControlNameEnum.country,
    ]) as FormControl;
  }

  errorMatcher = new MyErrorStateMatcher();

  constructor(private userSvc: UserService, private fb: FormBuilder) {}

  buildForm(user: userInterface): void {
    this.form = this.fb.group({
      [this.userFormControlNameEnum.name]: this.fb.group(
        {
          [this.userFormControlNameEnum.firstName]: this.fb.control(
            user.name.firstName,
            {
              validators: Validators.required,
            }
          ),
          [this.userFormControlNameEnum.lastName]: user.name.lastName,
        },
        {
          validators: Validators.required,
        }
      ),
      [this.userFormControlNameEnum.address]: this.fb.group(
        {
          [this.userFormControlNameEnum.country]: user.address.country,
          [this.userFormControlNameEnum.city]: user.address.city,
          [this.userFormControlNameEnum.postalCode]: user.address.postalCode,
        },
        {
          validators: Validators.required,
        }
      ),
      [this.userFormControlNameEnum.email]: this.fb.control(user.email, {
        validators: Validators.required,
      }),
      [this.userFormControlNameEnum.number]: user.userName,
      [this.userFormControlNameEnum.password]: user.password,
      [this.userFormControlNameEnum.birthDate]: user.birthDate,
      [this.userFormControlNameEnum.gameLevel]: user.gameLevel,
    });
    this.setUpSelectInputs();
    this.listenControlChanges();
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
