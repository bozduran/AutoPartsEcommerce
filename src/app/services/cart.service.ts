import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartItem} from '../common/cart-item';
import {BehaviorSubject, Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //    to store the items in browser
  storage:Storage = sessionStorage;


  constructor() {

    this.parseCartItemFromSessionStorage(
      this.storage.getItem('cartItems'));

  }

  parseCartItemFromSessionStorage(dataToParse:any){
    if (dataToParse!=null){
      this.cartItems = JSON.parse(dataToParse);
      this.calculateTotals();
    }
  }

  private baseUrl = environment.autoPartsUrl;

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
  //    save data to browser
  saveCartItemsToSessionStorage(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

  removeCartItemsFromSessionStorage(){
    this.storage.removeItem('cartItems');
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


    for (let tempCartItem of this.cartItems) {
      price += tempCartItem.price * tempCartItem.quantity;
      quantity += tempCartItem.quantity;
    }

    //    send new prices and quantity to all
    this.totalPrice.next(price);
    this.totalQuantity.next(quantity);

    this.saveCartItemsToSessionStorage();

  }

  clearCartData() {
    this.cartItems = [];
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
    this.removeCartItemsFromSessionStorage();

  }
}
