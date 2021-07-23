import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { storageInterface } from '../models/local-storage-item.model';
import { logInInterface } from '../models/log-in.model';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  isNewUserStatusSubject = new BehaviorSubject(this.getUserRecognizedStatus());
  isNewUserStatus$ = this.isNewUserStatusSubject.asObservable();

  adminFakeUserName: storageInterface = {
    key: 'userName',
    value: 'admin'
  }

  adminFakeUserPassword: storageInterface = {
    key: 'password',
    value: 'admin'
  }

  constructor(private localStorageSvc: LocalStorageService, private sessionStorageSvc: SessionStorageService) { }

  getUserRecognizedStatus(): boolean {
    return (
      !this.sessionStorageSvc.getItem("userName") &&
      !this.sessionStorageSvc.getItem("password")
    );
  }

  logInUser(user: logInInterface): boolean {
    this.isNewUserStatusSubject.next(!this.checkIfUserIsNew(user));
    return this.checkIfUserIsNew(user);
  }

  private checkIfUserIsNew(user: logInInterface): boolean {
    return (
      this.localStorageSvc.getItem("userName") === user.userName &&
      this.localStorageSvc.getItem("password") === user.password
    );
  }

  registerAdminFakeUser() {
    this.localStorageSvc.putItem(this.adminFakeUserName);
    this.localStorageSvc.putItem(this.adminFakeUserPassword);
  }
}
