import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartItemCount: Map<number, number> = new Map();
  cartItemArr!: number[];
  wishlistItemArr: any[] = JSON.parse(localStorage.getItem("wishlist_items_id") ?? "");

  constructor(private http: HttpClient) {
    if (localStorage.getItem("cart_item_id")) {
      this.cartItemArr = JSON.parse(localStorage.getItem("cart_items_id") ?? "");
    } else {
      this.cartItemArr = []
    }
  }

  getProducts(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/products`)
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/products/${id}`)
  }

  getCategoryProducts(category: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/catalog/${category}`)
  }

  addToCart(id: number): void {
    this.cartItemArr.push(id)
    localStorage.setItem("cart_items_id", JSON.stringify(this.cartItemArr))
  }

  getCartItemCount(): Map<number, number> {
    let uniqueArray: any[] = [...new Set(JSON.parse(localStorage.getItem("cart_items_id") ?? ""))];
    uniqueArray.forEach((el: number): void => {
      this.cartItemCount.set(el, JSON.parse(localStorage.getItem("cart_items_id") ?? "").filter((x: number): boolean => x === el).length)
    })

    return this.cartItemCount
  }

  removeFromCart(id: number): void {
    let cartItems = JSON.parse(localStorage.getItem("cart_items_id") ?? "")
    let filteredArray = cartItems.filter((e: number): boolean => e !== id)
    localStorage.setItem("cart_items_id", JSON.stringify(filteredArray))
  }

  searchForProduct(value: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/search/${value}`)
  }

  addToWishlist(id: number): void {
    if (!this.wishlistItemArr.includes(id)) {
      this.wishlistItemArr.push(id)
      console.log(this.wishlistItemArr)
      localStorage.setItem("wishlist_items_id", JSON.stringify(this.wishlistItemArr));
    }
  }

  getWishlistItems(ids: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/wishlist', {
      headers: {
        "wishlist_ids": ids
      }
    })
  }

  removeFromWishlist(id: number): void {
    console.log(this.wishlistItemArr)
    const product_index: number = this.wishlistItemArr.indexOf(id)
    console.log(product_index)
    this.wishlistItemArr.splice(product_index, 1)
    console.log(this.wishlistItemArr)
    localStorage.setItem("wishlist_items_id", JSON.stringify(this.wishlistItemArr))
  }
}
