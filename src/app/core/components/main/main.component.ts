import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtilService } from 'src/app/core/services/app-util.service';
import { MessageService } from 'primeng/api';
import { NotificationType } from 'src/app/models/notification-type';
import { Notification } from 'src/app/models/notification';
import { Util } from 'src/app/core/utils/util';
import { BaseComponent } from '../base/base/base.component';
import { HttpWebRequestService } from '../../services/http-web-request/http-web-request.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent extends BaseComponent {
  notifIcon:string='';
  notification?:Notification;

  constructor(private pgRoute:Router, appUtil:AppUtilService,private messageService: MessageService,private httpRequest:HttpWebRequestService) {
    super(pgRoute,appUtil,httpRequest);
    appUtil.notif$.subscribe(s=>{
      this.showmessage(s.message,s.title,s.notificationType);
    })
  }
  showmessage(msg:string,title:string,notificationType:NotificationType)
  {
    // if(notificationType== NotificationType.Error)
    // {
      //      this.notifIcon= Util.getSvg("error-red.svg",false);//sticky:true,

    // this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'message Content' });
    // }
    this.messageService.clear();
    this.notification= { message:msg,title:title, notificationType:notificationType} as Notification;
    if(this.notification)
    {
      switch(this.notification.notificationType)
      {
          case NotificationType.Error:
          this.notifIcon= Util.getSvg("error-red.svg",false);//sticky:true,
          this.messageService.add({   severity: 'error', summary: this.notification.title?this.notification.title:"Error", detail: this.notification.message });
          break;
          case NotificationType.Success:
            this.notifIcon= Util.getSvg("mark-green.svg",false);
            this.messageService.add({ severity: 'success', summary: this.notification.title?this.notification.title:"Success", detail: this.notification.message });
            break;
            case NotificationType.Warning:
            this.notification= this.notification;
            // this.showWarningDlg();
              break;    
          default:
            this.notifIcon= Util.getSvg("info-blue.svg",false);
            this.messageService.add({severity: 'info', summary: this.notification.title?this.notification.title:"Information", detail: this.notification.message });
            break;
      }
    }
  }
}
