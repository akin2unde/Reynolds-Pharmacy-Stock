import { Inject, NgModule, Optional } from '@angular/core';
import { ROUTER_CONFIGURATION, RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { AuthGuard } from './core/services/authGuard';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    canActivate: mapToCanActivate([AuthGuard]),
    path: 'login',
    loadChildren: () =>
      import('../app/views/specific/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./core/components/main/main.module').then(
        (m) => m.MainModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule],
  providers:[AuthGuard,]
})
export class AppRoutingModule { }
