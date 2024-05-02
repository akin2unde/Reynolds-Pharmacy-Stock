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
  selector: 'app-stock-count-main',
  templateUrl: './stock-count-main.component.html',
  styleUrl: './stock-count-main.component.scss'
})
export class StockCountMainComponent  {

}
