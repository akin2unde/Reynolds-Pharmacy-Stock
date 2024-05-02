import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from 'src/app/models/notification';
import { HttpWebRequestService } from './http-web-request/http-web-request.service';
import { ErrorResponse } from 'src/app/models/ErrorResponse';

@Injectable({
  providedIn: 'root'
})
export class AppUtilService {
  private _sideMenu = new Subject<string>();
  private _notif = new Subject<Notification>();
  notif$ = this._notif.asObservable();
  sideMenu$ = this._sideMenu.asObservable();

  constructor(private httpRequest:HttpWebRequestService) 
  {
    
  }
  public async get<T>(url:string):Promise<T|ErrorResponse>
  {
    const res =  await this.httpRequest.get<T>(
      url
    );
    return res;
  }
  public async post<T>(url:string,data:any):Promise<T|ErrorResponse>
  {
    const res =  await this.httpRequest.post<T>(
      url,data
    );
    return res;
  }
  
  notify(inf:Notification)
  {
    this._notif.next(inf);
  }
  notifySideMenu(data:string)
  {
    this._sideMenu.next(data);
  }
}
