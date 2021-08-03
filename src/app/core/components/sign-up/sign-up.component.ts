import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';

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

  constructor() { }

  ngAfterViewInit() {
    this.countryCtrl.valueChanges.subscribe(value => {
      this.citiesSubject.next(this.citiesModel[value])
    })
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
