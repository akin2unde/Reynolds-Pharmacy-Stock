import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/core/modules/shared.module';
import { StockCountComponent } from './stock-count.component';


export const appRoutes: Routes = [
  { path: "", component: StockCountComponent,title:"Stock Count" },
  { path: "stock-count", component: StockCountComponent, title:"Stock Count"}
];

@NgModule({
  declarations: [StockCountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ]
})
export class StockCountModule { }
