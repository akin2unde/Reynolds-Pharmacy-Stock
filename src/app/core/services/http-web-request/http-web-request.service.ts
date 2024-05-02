import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { ErrorResponse } from 'src/app/models/ErrorResponse';


export const baseUrl = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})

export class HttpWebRequestService {
  isProd = environment.production;
  constructor(private http: HttpClient) {

  }
  get<T>(url: string):Promise<T|ErrorResponse> {
    const URL = baseUrl + `/${url}`;
    return   new Promise((resolve, reject) => {this.http.get<T>(URL)
      .subscribe({
      next: (data) => resolve(data),
      error: (err) => resolve(new ErrorResponse(err))
    });})
  }
  post<T>(url: string, body: any): Promise<T|ErrorResponse> {
    return new Promise((resolve, reject) => {
      this.http
        .post(baseUrl+"/"+url, JSON.stringify(body))
        .subscribe({
          next: (data) => resolve(data as T),
          error: (err) =>
          { 
            console.log(err);
            resolve(
             new ErrorResponse(err)
            )
          }
        });
    });
  }
  put(url: string, body: any) {
    return this.http.put(baseUrl+"/"+url, body);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(baseUrl+"/"+ url);
  }
}
