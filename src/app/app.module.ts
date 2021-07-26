import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SessionStorageService } from './core/services/session-storage.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MatDialogModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (sessionStrSvc: SessionStorageService) => () => sessionStrSvc.clearStorage(),
    deps: [SessionStorageService],
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
