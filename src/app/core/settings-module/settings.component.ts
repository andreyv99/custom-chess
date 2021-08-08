import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  userProfileIsFull$ = this.userSvc.user$.pipe(map((x) => !x.profileIsFull));

  constructor(private userSvc: UserService) {}

  ngOnInit(): void {}
}
