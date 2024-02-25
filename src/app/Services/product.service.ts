import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartItemArr: number[] = JSON.parse(localStorage.getItem("cart_items_id") ?? "");
  cartItemCount: Map<number, number> = new Map();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/products`)
  }

  getOneProduct(id: number): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/products/${id}`)
  }

  getCategoryProducts(category: string): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/catalog/${category}`)
  }

  addToCart(id: number): void{
    this.cartItemArr.push(id)
    localStorage.setItem("cart_items_id", JSON.stringify(this.cartItemArr))
  }

  getCartItemCount(): Map<number, number>{
    let uniqueArray: any[] = [...new Set(JSON.parse(localStorage.getItem("cart_items_id") ?? ""))];
    uniqueArray.forEach((el: number): void=>{
      this.cartItemCount.set(el, JSON.parse(localStorage.getItem("cart_items_id") ?? "").filter((x: number): boolean => x === el).length)
    })

    return this.cartItemCount
  }

  removeFromCart(id: number): void{
    let cartItems = JSON.parse(localStorage.getItem("cart_items_id") ?? "")
    let filteredArray = cartItems.filter((e: number): boolean => e !== id)
    localStorage.setItem("cart_items_id", JSON.stringify(filteredArray))
  }
}
