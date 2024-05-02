import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { DashboardComponent } from 'src/app/views/specific/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/core/services/authGuard';

import { ToastModule } from 'primeng/toast';
import { SideBarModule } from '../side-bar/side-bar.module';
import { FooterModule } from '../footer/footer.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { ProductComponent } from 'src/app/views/specific/product/product.component';


export const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ProductComponent,
        canActivate: mapToCanActivate([AuthGuard]),
      },
      {
        path: 'home',
        canActivate: mapToCanActivate([AuthGuard]),
        loadChildren: () =>
          import('../../../views/specific/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
 
      {
        path: 'product',
        canActivate: mapToCanActivate([AuthGuard]),
        loadChildren: () =>
          import('../../../views/specific/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
       {
        path: 'stock-count',
        canActivate: mapToCanActivate([AuthGuard]),
        loadChildren: () =>
          import('../../../views/specific/stock-count/stock-count-main.module').then(
            (m) => m.StockCountMainModule
          ),
      },
    ],
  },
];
@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SideBarModule,
    FooterModule,
    TopBarModule,
    ToastModule
  ],
  exports: [RouterModule],

})
export class MainModule {

 }
