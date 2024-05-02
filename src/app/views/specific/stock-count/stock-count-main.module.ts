import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StockCountComponent } from './list/stock-count.component';
import { SharedModule } from 'src/app/core/modules/shared.module';
import { StockCountItemComponent } from './list-item/stock-count-item.component';
import { StockCountMainComponent } from './list-main/stock-count-main.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: StockCountMainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./list/stock-count.module').then(m => m.StockCountModule)
      },
      {
        path: 'stock-count-item/:code', 
        loadChildren: () => import('./list-item/stock-count-item.module').then(m => m.StockCountItemModule)
      },
    ],
    title:'Stock Count'//important to load the default route
  },
];
@NgModule({
  declarations: [StockCountMainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ]
})
export class StockCountMainModule { }
