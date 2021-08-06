import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild(NgForm) signUpForm: NgForm;
  @ViewChild('countryCtrl', { static: true }) countryCtrl: NgModel;

  countries = ['Ukraine', 'USA', 'Germany', 'Russia'];

  citiesModel = {
    Ukraine: ['Kiev', 'Kharkov', 'Lviv', 'Odessa'],
    USA: ['Chicago', 'New York', 'Miami', 'Atlanta'],
    Germany: ['Berlin', 'Dortmund', 'Bonn', 'Cologne'],
    Russia: ['Moscow', 'Sochi', 'Krasnodar', 'Surgut']
  }
  citiesSubject = new Subject();
  cities$ = this.citiesSubject.asObservable();

  constructor(private signUpService: SignUpService, private snackBar: MatSnackBar, private router: Router, private notificationsSvc: NotificationsService) { }

  ngAfterViewInit() {
    this.countryCtrl.valueChanges.subscribe(value => {
      this.citiesSubject.next(this.citiesModel[value])
    })
  }

  onSubmit() {
    this.signUpService.signUpUser(this.signUpForm.value)
    this.notificationsSvc.showNotification('You\'ve successfully signed up', 'cool', 1500, 'success-notification')

    setTimeout(() => {
      this.router.navigate(['../'])
    }, 1500)
  }
}
