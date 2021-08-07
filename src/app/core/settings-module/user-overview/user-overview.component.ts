import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: "app-user-overview",
  templateUrl: "./user-overview.component.html",
  styleUrls: ["./user-overview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOverviewComponent implements OnInit {
  user$ = this.userSvc.user$;
  constructor(private userSvc: UserService) {}

  ngOnInit(): void {}
}
