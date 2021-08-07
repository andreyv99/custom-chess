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
  adminFakeUser: storageInterface = {
    key: "admin",
    value: "admin",
  };

  constructor(
    private localStorageSvc: LocalStorageService,
    private sessionStorageSvc: SessionStorageService,
    private userSvc: UserService
  ) {}

  registerAdminFakeUser() {
    this.localStorageSvc.putItem(
      this.adminFakeUser.key,
      this.adminFakeUser.value
    );
  }

  logInUser(userCreds: logInInterface): boolean {
    if (this.userSvc.checkIfUserIsKnown(userCreds)) {
      this.registerUserInSessionStorage(userCreds);
    }
    const ifUserIsRegistered = this.userSvc.getUserRecognizedStatus(userCreds);
    this.userSvc.isNewUserStatusSubject.next(!ifUserIsRegistered);
    this.userSvc.userRecognizingErrorSubject.next(!ifUserIsRegistered);
    this.userSvc.userSubject.next(this.userSvc.getUser(userCreds.userName));

    return ifUserIsRegistered;
  }

  registerUserInSessionStorage(userCreds: logInInterface): void {
    this.sessionStorageSvc.putItem(userCreds.userName, userCreds.password);
  }
}
