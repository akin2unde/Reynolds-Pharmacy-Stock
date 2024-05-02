import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/core/modules/shared.module';
import { StockCountItemComponent } from './stock-count-item.component';



export const appRoutes: Routes = [
  { path: "", component: StockCountItemComponent,title:"Stock Count Item" },
  { path: "stock-count-item", component: StockCountItemComponent, title:"Stock Count Item"}
];
@NgModule({
  declarations: [StockCountItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ]
})
export class StockCountItemModule { }
