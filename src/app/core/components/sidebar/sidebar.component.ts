import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  errors = []
  constructor() { }
  ngOnInit(): void {
    window. = function myErrorHandler(err, url, line) {
      debugger
      this.errors.push(err)
      return false;   // so you still log errors into console
    }
  }

}
