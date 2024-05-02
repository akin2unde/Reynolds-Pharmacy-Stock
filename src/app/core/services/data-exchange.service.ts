import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ObjectState } from 'src/app/models/ObjectState';
import { Status } from 'src/app/models/status';

import { HttpWebRequestService } from './http-web-request/http-web-request.service';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { Product } from 'src/app/models/product';
import { StockCountEvent } from 'src/app/models/stock-count-event';
import { StoreCountStatus } from 'src/app/models/store-count-status';
import { ProductCount } from 'src/app/models/product-count';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  constructor(private httpRequest:HttpWebRequestService) { 

  }
  initProductCount():ProductCount
  {

    return {  sku:'', name:'', quantity:0,quantityCount:0} as ProductCount;
  }

  initProductObj():Product
  {
    return { code:'',createdAt:new Date(),updatedAt:new Date(), state :ObjectState.new, name:'',description:'',category:'', quantity:0} as Product;
  }
  initStockCountObj():StockCountEvent
  {
    return {code:'',createdAt:new Date(),updatedAt:new Date(), countedBy:'', itemObjects:[],status:StoreCountStatus.pending, state :ObjectState.new,description:''} as StockCountEvent;
  }
}
