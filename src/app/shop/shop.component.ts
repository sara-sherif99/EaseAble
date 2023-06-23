import { Component } from '@angular/core';
import { NavbarService } from '../services/navbar/navbar.service';
import { ProductService } from '../services/product/product.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SingleProductComponent } from '../single-product/single-product.component';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog } from '@angular/material/dialog';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../services/category/category.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent {
  selected = '';
  faSync=faSync;
  faShoppingCart=faShoppingCart;
  constructor( private http: HttpClient,public nav:NavbarService, public categoryService: CategoryService,
    public productService: ProductService,public dialog: MatDialog){
      this.maxValue=productService.maxprice;
    }
  // products:any;
  x:any;
  totalProducts:any;
  items:any;
  activeIndex:any;
  page: any = 1;
  count: any = 9;
  minValue: number = 0;
  maxValue:any=5000;
  async ngOnInit() {   
    this.activeIndex=0;
    
    this.items=[{name:'All',id:0}];
    this.nav.home=false;
    this.nav.about=false;
    this.nav.shop=true;
    
    await this.categoryService.getAllCategories().subscribe(
      {
        next:(response:any)=>{
          response?.forEach((element:any) => {
            this.items.push({name:element.categoryName,id:element.categoryId})
        })
      }
        ,error(err){console.log(err)}
      }
  );
 
  this.productService.getCount(this.activeIndex,this.minValue,this.maxValue).subscribe(
    { 
      next:(res:any)=>{
        this.totalProducts=res.length;
        console.log(res.length)
    }
      ,error(err){console.log(err)}
    })
    
  this.productService.getAllProducts().subscribe(
    {
      next:(res:any)=>{
        
        this.productService.products=res;
    }
      ,error(err){console.log(err)}
    }
);
  }
  filter(){
    // this.x=str;
   this.productService.products=[];
   this.productService.getCount(this.activeIndex,this.minValue,this.maxValue).subscribe(
    { 
      next:(res:any)=>{
        this.totalProducts=res;
        console.log(res)
    }
      ,error(err){console.log(err)}
    })
    this.productService.getPage(this.page,this.activeIndex,this.minValue,this.maxValue).subscribe(
      { 
        next:(res:any)=>{
          this.productService.products=res;
      }
        ,error(err){console.log(err)}
      })
   
   
   console.log(this.totalProducts)
  }
  Open(product:any){
      const dialogRef = this.dialog.open(SingleProductComponent, {
        panelClass: 'product-dialog',
        data:product
      });
  }

  
  options: Options = {
    floor: this.minValue,
    ceil: this.productService.maxprice,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '$' + value;
        case LabelType.High:
          return '$' + value;
        default:
          return '$' + value;
      }
    }
  };
  

  pageChangeEvent(event: number){
    this.page = event;
    this.filter();
}
  setCategory(category:any){
    this.activeIndex=category.id;
    this.filter();
  }
  setPriceRange(min:any,max:any){
    this.minValue=min;
    this.maxValue=max;
    this.filter();
  }



}
