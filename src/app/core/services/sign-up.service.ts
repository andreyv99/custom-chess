import { Injectable } from '@angular/core';

import { userInterface } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: "root",
})
export class SignUpService {
  constructor(
    private localStorageSvc: LocalStorageService,
    private sessionStorageSvc: SessionStorageService
  ) {}

  signUpUser(user: userInterface) {
    this.localStorageSvc.putItem(`user-${user.userName}`, JSON.stringify(user));
    this.localStorageSvc.putItem(user.userName, user.password);
  }
}
