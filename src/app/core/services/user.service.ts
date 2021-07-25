import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { logInInterface } from '../models/log-in.model';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  isNewUserStatusSubject = new BehaviorSubject(this.getUserRecognizedStatus());
  isNewUserStatus$ = this.isNewUserStatusSubject
    .asObservable()
    .pipe(map((x) => !x));

  userRecognizingErrorSubject = new BehaviorSubject(false);
  userRecognizingError$ = this.userRecognizingErrorSubject.asObservable();
  constructor(
    private localStorageSvc: LocalStorageService,
    private sessionStorageSvc: SessionStorageService
  ) {}

  getUserRecognizedStatus(): boolean {
    return (
      !!this.sessionStorageSvc.getItem("userName") &&
      !!this.sessionStorageSvc.getItem("password")
    );
  }

  checkIfUserIsKnown(user: logInInterface): boolean {
    return (
      this.localStorageSvc.getItem("userName") === user.userName &&
      this.localStorageSvc.getItem("password") === user.password
    );
  }
}
