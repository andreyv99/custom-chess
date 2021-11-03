import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Cities, Countries } from 'src/app/shared/hardcode/address';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

import { UserFormControlNameEnum } from '../../../shared/models/user.model';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild(NgForm) signUpForm: NgForm;
  @ViewChild('countryCtrl', { static: true }) countryCtrl: NgModel;

  userFormControlNameEnum = UserFormControlNameEnum;

  countries = Countries;
  citiesModel = Cities;

  citiesSubject = new Subject();
  cities$ = this.citiesSubject.asObservable();

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private notificationsSvc: NotificationsService
  ) { }

  ngAfterViewInit() {
    this.countryCtrl.valueChanges.subscribe((value) => {
      this.citiesSubject.next(this.citiesModel[value]);
    });
  }

  onSubmit() {
    this.signUpService.signUpUser({
      ...this.signUpForm.value,
      profileIsFull: false,
    });
    this.notificationsSvc.showNotification(
      'You\'ve successfully signed up',
      'cool',
      1500,
      'success-notification'
    );

    setTimeout(() => {
      this.router.navigate(['../']);
    }, 1500); Bobbobbob123;
  }
}
