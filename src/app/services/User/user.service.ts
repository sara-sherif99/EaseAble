import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private myClient: HttpClient) {

  }
  // private userURL = "https://eco-back-9qg1.onrender.com/user";
  private userURL = "https://localhost:7032/api/User";
  private cartURL = "https://localhost:7032/api/Carts";
  private orderURL = "https://localhost:7032/api/Orders";
  private imgURL = "https://localhost:7032/api/User/image";

  // addToWishList(userId: any, productId: any) {
  //   return this.myClient.patch<any>(`${this.userURL}/wishlist/${userId}`, { productId: productId });
  // }
  addToWishList(userId: any, productId: any) {
    return this.myClient.post<any>(`${this.userURL}/wishlist`, { userId, productId });
  }

  removeFromWishList(userId: any, productId: any) {
    return this.myClient.delete<any>(`${this.userURL}/wishlist?userId=${userId}&productId=${productId}`);
  }
  getWishList(userId: any) {
    return this.myClient.get<any>(`${this.userURL}/wishlist/${userId}`);
  }

  // addToCart(userId: any, productId: any, amount: any) {
  //   return this.myClient.patch<any>(`${this.userURL}/cart/${userId}`, { productId: productId, amount: amount });
  // }

  // removeFromCart(userId: any, productId: any) {
  //   return this.myClient.delete<any>(`${this.cartURL}/cart/${userId}/${productId}`);
  // }
  addToCart(userId: any, productId: any, productQuantity: any) {
    return this.myClient.post<any>(this.cartURL, {userId, productId, productQuantity });
  }

  removeFromCart(userId: any, productId: any) {
    return this.myClient.delete<any>(`${this.cartURL}?userId=${userId}&productId=${productId}`);
  }

  getCart(userId: any) {
    return this.myClient.get<any>(`${this.cartURL}/${userId}`);
  }
  editCart(userId: any, productId: any,quantity:any){
    return this.myClient.patch<any>(this.cartURL, {userId, productId, quantity });
  }

  getUserInfo(userId: any) {
    return this.myClient.get<any>(`${this.userURL}/${userId}`);
  }
  EditUserInfo(userId: any,userName: any, email: any, password: any, address: any, phoneNumber: any) {
    return this.myClient.patch<any>(`${this.userURL}/${userId}`,{ userName, email, phoneNumber,address },
   /* { headers: new HttpHeaders().set('Authorization', `${localStorage.getItem('token')}`) }*/);
  }
  addOrder(userId: any) {
    return this.myClient.get<any>(`${this.userURL}/${userId}`);
  }
  checkout(order: any) {
    return this.myClient.post<any>(this.orderURL,order);
  }
  emptyCart(userId: any) {
    return this.myClient.delete<any>(`${this.cartURL}/${userId}`);
  }

  getOrders(userId: any) {
    return this.myClient.get<any>(`${this.orderURL}/user/${userId}`);
  }
  removeOrder(id: any) {
    return this.myClient.delete<any>(`${this.orderURL}/${id}`);
  }
  cartCount(userId: any) {
    return this.myClient.get<any>(`${this.cartURL}/count/${userId}`);
  }
  wishlistCount(userId: any) {
    return this.myClient.get<any>(`${this.userURL}/wishlist/count/${userId}`);
  }
  profilePicture(userId:any,fd:any){
    return this.myClient.patch<any>(`${this.imgURL}/${userId}`,fd)
  }
}
