
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/core/modules/shared.module';



export const appRoutes: Routes = [
  { path: "", component: LoginComponent,title:"Login" },
  { path: "login", component: LoginComponent, title:"Login"}
];
@NgModule({
  declarations: [LoginComponent],
  imports: [
       RouterModule.forChild(appRoutes),
       SharedModule,
  ],
  exports: [RouterModule]
})
export class LoginModule { }
