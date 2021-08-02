import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  @ViewChild(NgForm) signUpForm: NgForm;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
