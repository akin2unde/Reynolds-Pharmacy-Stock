import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/core/modules/shared.module';


export const appRoutes: Routes = [
  { path: "", component: ProductComponent,title:"Product" },
  { path: "product", component: ProductComponent, title:"Product"}
];
@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
        SharedModule,

    RouterModule.forChild(appRoutes),

  ]
})
export class ProductModule { }
