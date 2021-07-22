import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  isNewUserStatusSubject = new BehaviorSubject(this.getUserRecognizedStatus());
  isNewUserStatus$ = this.isNewUserStatusSubject.asObservable();

  constructor(private storageSvc: LocalStorageService) {}

  getUserRecognizedStatus(): boolean {
    return (
      !this.storageSvc.getItem("userName") &&
      !this.storageSvc.getItem("password")
    );
  }
}
