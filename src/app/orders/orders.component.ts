import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product/product.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import { UserService } from '../services/User/user.service';
const orderStatusMap: { [key: number]: string } = {
  0: "Accepted",
  1: "Pending",
  2: "Rejected",
};
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: any = [];
  user: any;
  constructor(public dialog: MatDialog, private http: HttpClient, private myService: ProductService,
    private userService:UserService) { }
  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getOrders(this.user).subscribe(
      {
        next: (res:any) => {
          console.log(res)
          this.orders=res;
        },
        error(err) { console.log(err) }
      }
    );
  }
  Open(id: any) {
    this.myService.getProductByID(id).subscribe(
      {
        next: (res:any) => {
          const dialogRef = this.dialog.open(SingleProductComponent, {
              panelClass: 'product-dialog',
              data: res
            });
        },
        error(err) { console.log(err) }
      }
    );
    //
  }
  Remove(id: any) {
    console.log(id)
    this.userService.removeOrder(id).subscribe(
      {
        next: (res:any) => {
          this.onRefresh();
        },
        error(err) { console.log(err) }
      }
    );
  }
  getStatusString(status: number): string {
    return orderStatusMap[status] as string;
  }
}
