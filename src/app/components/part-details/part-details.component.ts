import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CarPartService} from '../../services/car-part.service';
import {Part} from '../../common/part';
import {MatButton} from '@angular/material/button';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-part-details',
  imports: [
    MatButton,
    CurrencyPipe
  ],
  templateUrl: './part-details.component.html',
  styleUrl: './part-details.component.css'
})
export class PartDetailsComponent implements OnInit {

  part: Part = new Part();

  constructor(private route: ActivatedRoute,
              private partService:CarPartService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listPartDetails();
    })
  }

  private listPartDetails() {
    const partId = this.route.snapshot.params['id'];

    this.partService.getProductById(partId).subscribe(
      data => {
        this.part = data;
      }
    )

  }

  addToCartClicked() {

    this.cartService.addToCart(new CartItem(this.part) );

  }
}
