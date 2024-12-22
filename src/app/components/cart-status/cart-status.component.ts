import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatBadge} from '@angular/material/badge';
import {CartService} from '../../services/cart.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-cart-status',
  imports: [
    MatIcon,
    MatIconButton,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }


}
