import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:any=[];
  maxprice:any;

  constructor(private myClient: HttpClient) {}
  // private productURL = "https://eco-back-9qg1.onrender.com/product";
  private productURL = "https://localhost:7032/api/Product";
  private productOnSaleURL = "https://localhost:7032/api/Product/sale";
  private productsCountURL = "https://localhost:7032/api/Product/count";
  private productPageURL = "https://localhost:7032/api/Product/filter";
  private productsMaxPriceURL = "https://localhost:7032/api/Product/maxprice";
  
  //Methods


  // 1)Get All product
  getAllProducts() {
    return this.myClient.get(this.productURL);
  }
  getOnSale() {
    return this.myClient.get(this.productOnSaleURL);
  }
  getMaxPrice() {
    return this.myClient.get(this.productsMaxPriceURL);
  }
  getCount(id:any,min:any,max:any) {
    const params = new HttpParams()
    .set('id', id)
    .set('min', min)
    .set('max', max);
    return this.myClient.get(this.productsCountURL,{ params });
  }
  getPage(page:any,id:any,min:any,max:any) {
    const params = new HttpParams()
    .set('page', page)
    .set('id', id)
    .set('min', min)
    .set('max', max);
    return this.myClient.get(this.productPageURL,{ params });
  }

  // 2)Get Product By ID
  getProductByID(id: any) {
    return this.myClient.get(`${this.productURL}/${id}`);
  }


}
