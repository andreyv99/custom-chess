import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { logInInterface } from '../models/log-in.model';
import { userInterface } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  isNewUserStatusSubject = new BehaviorSubject(true);
  isNewUserStatus$ = this.isNewUserStatusSubject.asObservable();

  userRecognizingErrorSubject = new BehaviorSubject(false);
  userRecognizingError$ = this.userRecognizingErrorSubject.asObservable();

  userSubject = new Subject<userInterface>();
  user$ = this.userSubject.asObservable().pipe(
    shareReplay(),
    tap((x) => console.log(x))
  );

  constructor(
    private localStorageSvc: LocalStorageService,
    private sessionStorageSvc: SessionStorageService
  ) {}

  getUserRecognizedStatus(userCreds: logInInterface): boolean {
    return (
      this.sessionStorageSvc.getItem(userCreds.userName) === userCreds.password
    );
  }

  checkIfUserIsKnown(userCreds: logInInterface): boolean {
    return (
      this.localStorageSvc.getItem(userCreds.userName) === userCreds.password
    );
  }

  getUser(userName: string): userInterface {
    return JSON.parse(this.localStorageSvc.getItem(`user-${userName}`));
  }
}
