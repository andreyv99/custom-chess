import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar
  ) { }

  showNotification(contentTest: string, btnText: string, duration: number = 1500, cssClass?: string) {
    this.snackBar.open(contentTest, btnText, {
      duration: duration,
      panelClass: cssClass
    });
  }

}
