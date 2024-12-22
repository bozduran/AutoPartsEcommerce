import {Order} from './order';
import {OrderItem} from './order-item';
import {Address} from './address';
import {Customer} from './customer';

export class Purchase {

  constructor(public orderItems:OrderItem[],
              public order:Order,
              public billingAddress:Address,
              public shippingAddress:Address,
              public customer:Customer) {
  }
}
