import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../common/purchase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl="http://localhost:8080/api/"
  private placeOrderUrl = this.baseUrl+"checkout/purchase"

  constructor(private httpClient: HttpClient) { }

  //    observable any for purchase response
  placeOrder(purchase: Purchase):Observable<any> {
    return this.httpClient.post<Purchase>(this.placeOrderUrl, purchase);
  }
}

