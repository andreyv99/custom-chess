import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { logInInterface } from '../models/log-in.model';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  isNewUserStatusSubject = new BehaviorSubject(true);
  isNewUserStatus$ = this.isNewUserStatusSubject
    .asObservable();

  userRecognizingErrorSubject = new BehaviorSubject(false);
  userRecognizingError$ = this.userRecognizingErrorSubject.asObservable();

  userSubject = new BehaviorSubject(34);
  user$ = this.userSubject.asObservable();

  constructor(
    private localStorageSvc: LocalStorageService,
    private sessionStorageSvc: SessionStorageService
  ) { }

  getUserRecognizedStatus(userCreds: logInInterface): boolean {
    return this.sessionStorageSvc.getItem(userCreds.userName) === userCreds.password;
  }

  checkIfUserIsKnown(userCreds: logInInterface): boolean {
    return this.localStorageSvc.getItem(userCreds.userName) === userCreds.password;
  }

  getUser() {

  }
}
