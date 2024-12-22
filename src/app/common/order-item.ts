import {CartItem} from './cart-item';

export class OrderItem {

   quantity:number;
   unitPrice:number;
   partId:number;

  constructor(cartItem:CartItem) {
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.price;
    this.partId = cartItem.id;
  }
}

