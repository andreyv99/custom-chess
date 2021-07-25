import { Injectable } from '@angular/core';

import { storageInterface } from '../models/local-storage-item.model';
import { logInInterface } from '../models/log-in.model';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  adminFakeUserName: storageInterface = {
    key: "userName",
    value: "admin",
  };

  adminFakeUserPassword: storageInterface = {
    key: "password",
    value: "admin",
  };

  constructor(
    private localStorageSvc: LocalStorageService,
    private sessionStorageSvc: SessionStorageService,
    private userSvc: UserService
  ) {}

  registerAdminFakeUser() {
    this.localStorageSvc.putItem(this.adminFakeUserName);
    this.localStorageSvc.putItem(this.adminFakeUserPassword);
  }

  logInUser(user: logInInterface): boolean {
    let a = this.userSvc.checkIfUserIsKnown(user);
    if (a) this.registerUserInSessionStorage(user);
    let ifUserIsRegistered = this.userSvc.getUserRecognizedStatus();
    this.userSvc.isNewUserStatusSubject.next(ifUserIsRegistered);
    this.userSvc.userRecognizingErrorSubject.next(!ifUserIsRegistered);

    return ifUserIsRegistered;
  }

  registerUserInSessionStorage(user: logInInterface): void {
    this.sessionStorageSvc.putItem({ key: "userName", value: user.userName });
    this.sessionStorageSvc.putItem({ key: "password", value: user.password });
  }
}
