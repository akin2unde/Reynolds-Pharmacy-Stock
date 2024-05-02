import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/core/modules/shared.module';


export const appRoutes: Routes = [
  { path: "", component: DashboardComponent,title:"Home" },
  { path: "home", component: DashboardComponent, title:"Home"}
];
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(appRoutes),

  ]
})
export class DashboardModule { }
