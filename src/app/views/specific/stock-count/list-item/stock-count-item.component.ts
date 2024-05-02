import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/components/base/base/base.component';
import { AppUtilService } from 'src/app/core/services/app-util.service';
import { DataExchangeService } from 'src/app/core/services/data-exchange.service';
import { HttpWebRequestService } from 'src/app/core/services/http-web-request/http-web-request.service';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { ObjectState } from 'src/app/models/ObjectState';
import { Product } from 'src/app/models/product';
import { ProductCount } from 'src/app/models/product-count';
import { StockCountEvent } from 'src/app/models/stock-count-event';
import { StoreCountStatus } from 'src/app/models/store-count-status';

@Component({
  selector: 'app-stock-count-item',
  templateUrl: './stock-count-item.component.html',
  styleUrl: './stock-count-item.component.scss'
})
export class StockCountItemComponent extends BaseComponent {
  storeCount:StockCountEvent;
  code:string;
  status= StoreCountStatus;
  constructor(private pgRoute:Router, appUtil:AppUtilService,
    private httpRequest:HttpWebRequestService, public xchangeservice:DataExchangeService) {
    super(pgRoute,appUtil,httpRequest);
      this.activareRoute.params.subscribe(params => {
       this.code= params['code'];
       if(this.code=='new')
        {
          this.storeCount= xchangeservice.initStockCountObj();
          this.code="";
        }
    });
  }
  override async ngOnInit(): Promise<void>
  {
    if(this.code){
      await this.getData()
    }
    else{
      await this.getProduct();
    }
  }
  async getProduct()
  {
    this.start();
    const res =  await this.httpRequest.get<Product[]>(
          `product/getAll`
        );
    if(res instanceof ErrorResponse) 
      {
       this.showError(res.message);
      } 
      else 
      {
        this.storeCount.countedBy= this.user.email;
        this.storeCount.description=`Stock count on ${new Date().toLocaleDateString()} by ${this.user.email}`
        this.storeCount.itemObjects= res.map(_=>{return { sku:_.code, name:_.name, quantity:_.quantity,quantityCount:0, } as ProductCount});
      }
    this.end(); 
  }
  async getData()
  {
    this.start();
    const res =  await this.httpRequest.get<StockCountEvent>(
          `stockCount/getByCode/${this.code}`
        );
    if (res instanceof ErrorResponse) {
      this.showError( res.message,
      );
    } else {
      this.storeCount=res;
    }
    this.end(); 
  }
  async save()
  {
    this.start();
    const res =  await this.httpRequest.post<Product[]|ErrorResponse>(
          `stockCount/save`,[{...this.storeCount,state:this.storeCount.state== ObjectState.unchanged?ObjectState.changed:this.storeCount.state}]
        );
    if (res instanceof ErrorResponse) {
      this.showError( res.message,
      );
    } 
    else {
     this.showSuccess();
     this.goBack();
    }
    this.end();  
  }

}
