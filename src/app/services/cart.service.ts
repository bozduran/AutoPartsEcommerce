import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartItem} from '../common/cart-item';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) {
  }

  private baseUrl = "http://localhost:8080/api/";

  cartItems: CartItem[] = [];

  //    The event will be sent to all the subscribers
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  addToCart(cartItemToAdd: CartItem) {

    let cartIemIinCart = undefined;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItemToAdd.id) {
          cartIemIinCart = tempCartItem;
          break;
        }
      }
    }


    if (cartIemIinCart != undefined) {
      cartIemIinCart.quantity = cartIemIinCart.quantity + 1;
    } else {
      this.cartItems.push(cartItemToAdd);
    }

    this.calculateTotals()

  }

  decreaseCartItemQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.calculateTotals()
    }


  }

  remove(cartItemToRemove: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItemToRemove.id);

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.calculateTotals()

  }

  calculateTotals() {
    let quantity = 0;
    let price = 0;

    console.log("---------------")
    for (let tempCartItem of this.cartItems) {
      price += tempCartItem.price * tempCartItem.quantity;
      quantity += tempCartItem.quantity;
      console.log(tempCartItem)
    }
    console.log("-------------")

    //    send new prices and quantity to all
    this.totalPrice.next(price);
    this.totalQuantity.next(quantity);

  }

  clearCartData() {
    this.cartItems = [];
  }
}
