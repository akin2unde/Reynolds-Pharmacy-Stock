import { LocationStrategy, PathLocationStrategy,Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUtilService } from 'src/app/core/services/app-util.service';
import { HttpWebRequestService } from 'src/app/core/services/http-web-request/http-web-request.service';
import Store, { AppKey } from 'src/app/core/utils/store';
import { Util } from 'src/app/core/utils/util';
import { User } from 'src/app/models/user';
import { Notification } from 'src/app/models/notification';
import { NotificationType } from 'src/app/models/notification-type';
import { ErrorResponse } from 'src/app/models/ErrorResponse';

@Component({

  styleUrls: ['./base.component.scss'],
  template: '',
  providers:[Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class BaseComponent implements OnInit {
  // NotificationType=NotificationType;
  // Util= Util;
  public loading: boolean = false;
  // appUtilService= inject(AppUtilService);
  location= inject(Location)
  isMobile = window.innerWidth <= 768;
  // appSecreteKey= 'mtnNG001DLCM#@';
  dataLoading = false;
  dummyData = Array.from({ length: 5 }).map((_, i) => (''));
  limit:number=100;
  skip:number=0;
  lastItem:string="";
  totalDataSize:number=0;
  user= new Store().get(AppKey.USER) as User;
  isModelFromUpload = false;
  activareRoute= inject(ActivatedRoute)
  constructor(
      private route: Router,
      public appUtilService:AppUtilService,
      private httpRequestClient:HttpWebRequestService
  ) { 
    var snapshot = this.activareRoute.snapshot;
    appUtilService.notifySideMenu(snapshot.routeConfig.title as string)
  }

  ngOnInit(): void {
    // var snapshot = this.activareRoute.snapshot;
    // console.log(snapshot.url[0].path); 
  }
  getSvg(name:string,isImage:boolean=false){
   return Util.getSvg(name,isImage);
  }
  goToPage(page:string, extra?:any){
    if(extra)
    {
      this.route.navigate([`/${page}`, extra]);
    }
    else{
      this.route.navigateByUrl(`/${page}`);
    }
  }
  goToPageChild(arr:string[]){
   
      this.route.navigate(arr,{relativeTo:this.activareRoute});
  }
  goBack(){
    this.location.back();
  }
  showLoader(): void {
    // this.appUtilService.sendBI(true);
    this.loading=true;
  }
  closeLoader(): void {
    this.loading=false
    // this.appUtilService.sendBI(false);
  }
  private showNotification(notif:Notification){
    this.appUtilService.notify(notif);
  }
  showSuccess(msg:string="Operation Successful", title:string="Success")
  {
    this.showNotification({ message:msg,title:title,notificationType:NotificationType.Success} as Notification)
  }
  showError(msg:string, title:string="Error")
  {
    this.showNotification({ message:msg,title:title,notificationType:NotificationType.Error} as Notification)
  }

  start() { this.dataLoading = true; }
  end() { this.dataLoading = false; }

  closeUploadModel() { this.isModelFromUpload = false }
}
