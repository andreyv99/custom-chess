import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { RoutePath } from 'src/app/shared/enums/route-path.enum';

import { UserService } from '../../services/user.service';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  routePath = RoutePath;
  isNewUser$ = this.userSvc.isNewUserStatus$.pipe(tap((x) => console.log(x)));

  user$ = this.userSvc.user$;
  constructor(private userSvc: UserService, private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(LogInComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
