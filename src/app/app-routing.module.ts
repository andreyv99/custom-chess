import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { RoutePath } from './shared/enums/route-path.enum';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/game/game.module").then((m) => m.GameModule),
  },
  {
    path: RoutePath.signUp,
    component: SignUpComponent,
  },
  {
    path: RoutePath.settings,
    loadChildren: () =>
      import("./core/settings-module/settings.module").then(
        (m) => m.SettingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
