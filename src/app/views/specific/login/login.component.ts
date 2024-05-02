import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/components/base/base/base.component';
import { AppUtilService } from 'src/app/core/services/app-util.service';
import { HttpWebRequestService } from 'src/app/core/services/http-web-request/http-web-request.service';
import Store, { AppKey } from 'src/app/core/utils/store';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  store = new Store();
  constructor(private pgRoute:Router, appUtil:AppUtilService,private httpRequest:HttpWebRequestService) {
    super(pgRoute,appUtil,httpRequest);
    this.store.clearAll();
    this.user= {} as User;
    this.user.email="akin2unde@gmail.com"
    this.user.password="akin";
  }

  async login()
  {
     this.start();
    const res =  await this.httpRequest.post<User>(
          `auth/login`,this.user
        );
    if (res instanceof ErrorResponse) {
      this.showError( res.message,
      );
    } else {
      this.store.set(AppKey.USER,res);
      this.goToPage('product');
    }
    this.end();
  }
}
