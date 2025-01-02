import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderHistory} from '../common/order-history';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private baseUrl = "http://localhost:8080/api"

  constructor(private httpClient: HttpClient) {
  }

  private extractContent<T>(response: { content: T }): T {
    return response.content;
  }

  //    get the history of orders
  getOrderHistory(theEmail: string):Observable< PageOrderHistoryResponse<OrderHistory>> {

    const orderHistoryUrl = `${this.baseUrl}/order-history/get-orders-by-url?email=${theEmail}`;

    return this.httpClient.get< PageOrderHistoryResponse<OrderHistory>>(orderHistoryUrl);

  }

}
export interface PageOrderHistoryResponse<OrderHistory> {
  content:OrderHistory[];

}
