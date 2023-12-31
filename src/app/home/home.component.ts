import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { SingleProductComponent } from '../single-product/single-product.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { NavbarService } from '../services/navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public myService: ProductService, public dialog: MatDialog, public nav: NavbarService) { }
  faMoneyBill1 = faMoneyBill1;
  faShippingFast = faShippingFast;
  faPhoneVolume = faPhoneVolume;
  faSync = faSync;
  faShoppingCart = faShoppingCart;

  products: any;
  ngOnInit(): void {

    this.nav.home = true;
    this.nav.about = false;
    this.nav.shop = false;
    this.myService.getOnSale().subscribe(
      {
        next: (res: any) => {
          this.products = res;
        }
        , error(err) { console.log(err) }
      }
    )
    this.myService.getMaxPrice().subscribe(
      { 
        next:(res:any)=>{
          this.myService.maxprice=res;
      }
        ,error(err){console.log(err)}
      })
  }

  Open(product: any) {
    if (localStorage.getItem("isLoggedIn") == 'true') {
      const dialogRef = this.dialog.open(SingleProductComponent, {
        panelClass: 'product-dialog',
        data: product
      });
    }
    else {
      const dialogRef = this.dialog.open(AuthComponent, {
        width: '350px',
        panelClass: 'auth-dialog',
      });
    }
  }
}