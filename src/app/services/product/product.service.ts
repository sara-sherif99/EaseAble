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
  private productURL = "https://abilitysystem.azurewebsites.net/api/Product";
  private productOnSaleURL = "https://abilitysystem.azurewebsites.net/api/Product/sale";
  private productsCountURL = "https://abilitysystem.azurewebsites.net/api/Product/count";
  private productPageURL = "https://abilitysystem.azurewebsites.net/api/Product/filter";
  private productsMaxPriceURL = "https://abilitysystem.azurewebsites.net/api/Product/maxprice";
  
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
