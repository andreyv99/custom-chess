import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: "root",
})
export class SettingsGuard implements CanActivate {
  constructor(private userSvc: UserService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userSvc.user$.pipe(map((x) => true));
  }
}
