import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkout(totalPrice: number, deliveryMethod: string): Observable<any>{
    return this.http.post('https://api2.rgutmanis.com/api/checkout', {totalPrice: +`${totalPrice}`, deliveryMethod: deliveryMethod}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
      }),
    })
  }

  getOrders(): Observable<any>{
    return this.http.get(`https://api2.rgutmanis.com/api/orders`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
      }),
    })
  }
}
