import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:3000/products";

  constructor(private httpClient: HttpClient) { }

  storeServers(payLoad: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return  this.httpClient.post(this.APIUrl, payLoad, httpOptions);
  }

  getRestaurants():Observable<any> {
    return this.httpClient.get<any>(this.APIUrl);
  }

  addRestaurant(val: any){
    return this.httpClient.post(this.APIUrl, val);
  }

  deleteRestaurant(val:any){
    return this.httpClient.delete(this.APIUrl + '/' + val);
  }
}
