import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, finalize, tap } from "rxjs/operators";
import { User } from "src/app/models/user";
import { ErrorResponse } from "src/app/models/ErrorResponse";
import Store, { AppKey } from "../../utils/store";

@Injectable()
export class AppInterceptorService implements HttpInterceptor {
  store = new Store();
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.store.get(AppKey.USER);
    const req = request.clone({
      headers: request.headers
        .set("Content-Type", "application/json")
        .set("Authorization",  (user && (user as User).token?(user as User).token:""))
    });
    return next.handle(req)
      .pipe(
        catchError((error) => {
            let errorMsg = '';
            if (error.error) 
            {
              errorMsg = `Error: ${error.error.message}`;
            }
            else 
            {
              if(error.status==0 && error.error instanceof ProgressEvent){
                errorMsg='Internet not available';
              }
              else{
                  errorMsg= error.message
              }
            }
            if(error.statusText=="Unknown Error" && error.status!==0){
              errorMsg="Server is unreachable"
            }
            return throwError(()=>errorMsg);
        })
    )
 }
}

