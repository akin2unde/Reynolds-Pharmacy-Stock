import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/components/base/base/base.component';
import { AppUtilService } from 'src/app/core/services/app-util.service';
import { DataExchangeService } from 'src/app/core/services/data-exchange.service';
import { HttpWebRequestService } from 'src/app/core/services/http-web-request/http-web-request.service';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { StockCountEvent } from 'src/app/models/stock-count-event';
import { StoreCountStatus } from 'src/app/models/store-count-status';

@Component({
  selector: 'app-stock-count',
  templateUrl: './stock-count.component.html',
  styleUrl: './stock-count.component.scss'
})
export class StockCountComponent extends BaseComponent {

  storeCounts:StockCountEvent[]=[];
  storeCount:StockCountEvent;
  status=StoreCountStatus;
  constructor(private pgRoute:Router, appUtil:AppUtilService,
    private httpRequest:HttpWebRequestService, public xchangeservice:DataExchangeService) {
    super(pgRoute,appUtil,httpRequest);
  }
   override async ngOnInit(): Promise<void>
  {
    await this.getData()
  }
  async getData()
  {
    this.start();
    const res =  await this.httpRequest.get<StockCountEvent[]>(
          `stockCount/getAll`
        );
    if (res instanceof ErrorResponse) {
      this.showError( res.message,
      );
    } else {
      this.storeCounts=res;
    }
    this.end(); 
  }
  edit(data :StockCountEvent)
  {
    
  }
  delete(data:StockCountEvent)
  {

  }


}
