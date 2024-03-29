import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './core/components/sign-up/sign-up.component';
import { SettingsGuard } from './guards/settings.guard';
import { RoutePath } from './shared/enums/route-path.enum';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/game/game.module').then((m) => m.GameModule),
  },
  {
    path: RoutePath.signUp,
    component: SignUpComponent,
  },
  {
    path: RoutePath.settings,
    loadChildren: () =>
      import('./settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [SettingsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
