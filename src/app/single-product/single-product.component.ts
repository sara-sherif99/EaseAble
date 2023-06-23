import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeart } from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/User/user.service'
import { NavbarService } from '../services/navbar/navbar.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  faHeartFill = faHeartFill;
  faHeart = faHeart;
  added: boolean = false;
  inCart: boolean = false;
  user: any;
  amount: any = 1;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public myService: UserService, public nav: NavbarService) { }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.myService.getWishList(this.user).subscribe(
      {
        next: (res) => {
          res.forEach((element: any) => {
            if(element.productId==(this.data.productId)){
              this.added=true;
              console.log(this.added)
            }
          });
        },
        error(err) { console.log(err) }
      }
    );
    this.myService.getCart(this.user).subscribe(
      {
        next: (res) => {
          res.forEach((element: any) => {
            if(element.productId==(this.data.productId)){
              this.inCart=true;
              console.log(this.added)
            }
          });
        },
        error(err) { console.log(err) }
      }
    );
    // this.added = this.user.wishlist.some((el: any) => { return el == this.data._id })
    // this.inCart = this.user.cart.some((el: any) => { return el.productId == this.data._id })
  }
  WishList() {
    this.added = !this.added;
    if (this.added) {
      this.nav.wishlist += 1;
      this.myService.addToWishList(this.user, this.data.productId).subscribe(
        {
          next: (res) => {
            // localStorage.setItem('user', JSON.stringify(res.user));
            console.log(res)
          },
          error(err) { console.log(err) }
        }
      );
    }
    else {
      this.nav.wishlist -= 1;
      this.myService.removeFromWishList(this.user, this.data.productId).subscribe(
        {
          next: (res) => {
            // const user = JSON.parse(localStorage.getItem('user') || '{}');
            // user.wishlist = user.wishlist.filter((obj: any) => { return obj !== this.data._id });
            // localStorage.setItem('user', JSON.stringify(user));
            console.log(res)
          },
          error(err) { console.log(err) }
        }
      );

    }

  }
  AddToCart() {
    this.nav.cart += 1;
    this.inCart = !this.inCart;
    this.myService.addToCart(this.user, this.data.productId, this.amount).subscribe(
      {
        next: (res) => {
          console.log(res);

          // localStorage.setItem('user', JSON.stringify(res.user));
        },
        error(err) { console.log(err) }
      }
    );
  }
  RemovefromCart() {
    this.inCart = !this.inCart;
    this.nav.cart -= 1;
    this.myService.removeFromCart(this.user, this.data.productId).subscribe(
      {
        next: (res) => {
          // localStorage.setItem('user', JSON.stringify(res.user));
        },
        error(err) { console.log(err) }
      }
    );

  }
}
