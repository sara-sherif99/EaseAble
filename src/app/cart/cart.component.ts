import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NavbarService } from '../services/navbar/navbar.service';
import { ProductService } from '../services/product/product.service';
import { UserService } from '../services/User/user.service';
import { SingleProductComponent } from '../single-product/single-product.component';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @ViewChild('closebutton') closebutton!: ElementRef;
  constructor(private productService: ProductService, public dialog: MatDialog, public categoryService: CategoryService,
    private nav: NavbarService, private http: HttpClient, private userService: UserService) { }

  products: any;
  user: any;
  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    var arr: any = [];
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userService.getCart(this.user).subscribe(
      {
        next: (res: any) => { 
          this.products=res;
        }
        , error(err) { console.log(err) }
      });
    this.products = arr;
  }
  removeItem(id: any) {
    console.log(this.user,id)
    // this.nav.cart -= 1;
    this.userService.removeFromCart(this.user, id).subscribe(
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

  get geTotal() {
    let total = 0;
    this.products.forEach((element: any) => {
      total += ((element.product.price * (1 - element.product.sale / 100)) * element.productQuantity);
    });
    return total;
  }
  get allTotal() {
    let alltotal = 0;
    let shipping = 45;
    return alltotal = shipping + this.geTotal;
  }
  increase(product:any) {
    product.productQuantity+=1;
  this.userService.editCart(this.user,product.productId,product.productQuantity).subscribe(
    {
      next: (res) => {
      },
      error(err) { console.log(err) }
    }
  );
    // this.products.forEach((element: any) => {
    //   if (element._id == _id && element.amount <= element.productQuantity) { element.amount++; }
    //   console.log()
    // })
  }
  decrease(product:any) {
    // this.products.forEach((element: any) => {
    //   if (element._id == _id && element.amount !== 0) { element.amount--; }
    // })
    product.productQuantity-=1;
    this.userService.editCart(this.user,product.productId,product.productQuantity).subscribe(
      {
        next: (res) => {
        },
        error(err) { console.log(err) }
      }
    );
  }

  Open(product: any) {
    this.categoryService.getCategoryWithProducts(product.product.categoryId).subscribe(
      {
        next: (res:any) => {
          product.product.categoryName=res.categoryName;
        },
        error(err) { console.log(err) }
      }
    );
    const dialogRef = this.dialog.open(SingleProductComponent, {
      panelClass: 'product-dialog',
      data: product.product
    });
  }

  Checkout() {
    var prods=this.products.map((x:any)=> {
      return {
        productId:x.productId,
        productQuantity:x.productQuantity
      };
    });
    var order= { userId: this.user, totalPrice: this.allTotal, products: prods  };
    this.userService.checkout(order)
    .subscribe(
      {
        next: (res:any) => {
          this.userService.emptyCart(this.user).subscribe(
            (response) => {
              console.log(response)
              this.closebutton.nativeElement.click();
              this.onRefresh();
              location.reload();
            },
            (error) => {
            }
          );
        },
        error(err) { console.log(err) }
      }
    );
  }

}

