import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-cart-details',
  imports: [
    MatTable,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatRow,
    MatHeaderRow,
    MatIcon,
    MatIconButton,
    RouterLink,
    RouterLinkActive,
    NgIf,
    CurrencyPipe,
    MatButton,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})





export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  // used for mat mat-table
  columnsToDisplay = ['name','quantity', 'price','actions'];

  constructor(private cartService: CartService) { }

  @ViewChild(MatTable) table!: MatTable<CartItem>;
  dataSource = new MatTableDataSource<CartItem>([]);


  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails() {

    //    get the cart items
    this.cartItems = this.cartService.cartItems;
    this.dataSource.data = this.cartItems;

    //    subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //    subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    //    calculate price and quantity
    this.cartService.calculateTotals();
  }


  decreaseCartItemQuantity(theCartItem:CartItem) {

    this.cartService.decreaseCartItemQuantity(theCartItem);
    this.table.renderRows();

  }

  removeCartItem(theCartItem:CartItem) {

    this.cartService.remove(theCartItem);
    this.table.renderRows();

  }

  addCartItem(theCartItem:CartItem) {
    this.cartService.addToCart(theCartItem);
  }
}
