import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from '../services/navbar/navbar.service';
import { ProductService } from '../services/product/product.service';
import { UserService } from '../services/User/user.service';
import { SingleProductComponent } from '../single-product/single-product.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  constructor(private productService: ProductService,
    private userService: UserService, private http: HttpClient, public dialog: MatDialog,
    private nav: NavbarService) { }
  products: any = [];
  cart: any = [];
  user: any;
  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    var arr: any = [];
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    // this.products = this.user.wishlist?.forEach((ele: any) => {

    //   this.productService.getProductByID(ele).subscribe(
    //     {

    //       next: (res: any) => {
    //         console.log(this.user.cart?.find((el: any) => el.productId == res._id));
    //         if (ele) {
    //           if (this.user.cart.find((el: any) => el.productId == res._id)) { res.inCart = true }
    //           else { res.inCart = false };
    //           arr.push(res);
    //         }
    //       }
    //       , error(err) { console.log(err) }
    //     });
    // });
    this.userService.getCart(this.user).subscribe(
      {
        next: (res) => {
          this.cart=res;
        },
        error(err) { console.log(err) }
      }
    )
    this.userService.getWishList(this.user).subscribe(
      {
        next: (res) => {
          res.forEach((el: any) => {
            this.cart.forEach((element: any) => {
              if(element.productId==el.productId){
                el.inCart=true;
                console.log(el)
              }
            });
            }
          )
          this.products = res;
          // localStorage.setItem('user', JSON.stringify(res.user));
          // this.nav.wishlist -= 1;
          // this.onRefresh();
        },
        error(err) { console.log(err) }
      }
    );

    
  }
  Remove(id: any) {
    this.userService.removeFromWishList(this.user, id).subscribe(
      {
        next: (res) => {
          // localStorage.setItem('user', JSON.stringify(res.user));
          // this.nav.wishlist -= 1;
          this.onRefresh();
          location.reload();
        },
        error(err) { console.log(err) }
      }
    );
  }
  AddToCart(id: any) {
    this.userService.addToCart(this.user, id, 1).subscribe(
      {
        next: (res) => {
          // localStorage.setItem('user', JSON.stringify(res.user));
          this.onRefresh();
          location.reload();
        },
        error(err) { console.log(err) }
      }
    );
  }
  async Open(product: any) {
    var curr:any;
    await this.productService.getProductByID(product.productId).subscribe(
      {
        next: (res) => {
          curr=res;
          const dialogRef = this.dialog.open(SingleProductComponent, {
            panelClass: 'product-dialog',
            data: curr
          });
        },
        error(err) { console.log(err) }
      }
    );
    
  }
}
