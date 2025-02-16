import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../common/purchase';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PaymentInfo} from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl= environment.autoPartsUrl;
  private placeOrderUrl = this.baseUrl+"/checkout/purchase"
  private paymentUrl = this.baseUrl+"/checkout/payment_intent";

  constructor(private httpClient: HttpClient) { }

  //    observable any for purchase response
  placeOrder(purchase: Purchase):Observable<any> {
    return this.httpClient.post<Purchase>(this.placeOrderUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    // get the payment intent from spring backend
    return this.httpClient.post<PaymentInfo>(this.paymentUrl, paymentInfo);
  }
}

