import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/components/base/base/base.component';
import { AppUtilService } from 'src/app/core/services/app-util.service';
import { DataExchangeService } from 'src/app/core/services/data-exchange.service';
import { HttpWebRequestService } from 'src/app/core/services/http-web-request/http-web-request.service';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { ObjectState } from 'src/app/models/ObjectState';
import { Product } from 'src/app/models/product';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent extends BaseComponent {

   product:Product;
   products:Product[]=[];

  statusEnum=Status
  show=false;
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
    const res =  await this.httpRequest.get(
          `product/getAll`
        );
    if (res instanceof ErrorResponse) {
      this.showError( res.message,
      );
    } else {
      var result = res as Product[] ;
      this.products=result;
    }
    this.end(); 
  }
  toggleCUDComponent(state:boolean)
  {
     this.show=state;
  }


  async save(prd:Product[]=[this.product])
  {
    this.start();
    const res =  await this.httpRequest.post<Product[]|ErrorResponse>(
          `product/save`,prd.map(_=>{return {..._, state: _.state== ObjectState.unchanged?ObjectState.changed:_.state}})
        );
    if (res instanceof ErrorResponse) {
      this.showError( res.message,
      );
    } else {
       prd.forEach(_=>{
        if(_.state== ObjectState.new)
        {
          var found = res.find(w=>w.description==_.description && !w.error);
          if(found){
              this.products.unshift(found);
          }
        }
        else if(_.state== ObjectState.deleted)
        {
          var foundIndex = res.findIndex(w=>w.description==_.description);
          this.products.splice(foundIndex,1);
        }
       });
       this.showSuccess();
       this.toggleCUDComponent(false);
    }
    this.end();  
  }

}
