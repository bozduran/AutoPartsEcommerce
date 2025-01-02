import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderHistory} from '../../common/order-history';
import {OrderHistoryService, PageOrderHistoryResponse} from '../../services/order-history.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {DatePipe, NgIf} from '@angular/common';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-order-history',
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatTable,
    NgIf,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatRowDef,
    DatePipe
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  orderHistory:OrderHistory[]=[];

  storage:Storage=sessionStorage;

  columnsToDisplay = ['orderTrackingId',  'totalPrice','status', 'createdDate'];


  @ViewChild(MatTable) table!: MatTable<OrderHistory>;
  dataSource = new MatTableDataSource<OrderHistory>([]);



  constructor(private orderHistoryService:OrderHistoryService) {
  }

  ngOnInit(): void {

    this.handleOrderHistory();
    this.dataSource.data = this.orderHistory;

  }

  private handleOrderHistory() {
    const theEmail = this.storage.getItem('userEmail');

    if (theEmail === null) {
      return;
    }

    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      (data: PageOrderHistoryResponse<OrderHistory>) => {
        this.orderHistory = data.content.map<OrderHistory>((tempOrderItem)=>
          {
            return new OrderHistory(tempOrderItem.orderTrackingId,tempOrderItem.totalPrice,tempOrderItem.status,tempOrderItem.createdDate)
          }

        );
      }
    );
  }

}
