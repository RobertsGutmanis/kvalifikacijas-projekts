import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartItemCount: Map<number, number> = new Map();
  cartItemArr: number[] = [];
  wishlistItemArr: any[] = [];
  url: string = `https://api.rgutmanis.com/api`
  // url: string = `http://localhost:8000/api`

  //Uz projekta sākumu pārbauda, vai localStorage eksistē "wishlist_items_id" un "cart_items_id", un ja eksistē, tad to vērtības ieliek mainīgajos
  constructor(private http: HttpClient) {
    if(localStorage.getItem("wishlist_items_id")){
      this.wishlistItemArr = JSON.parse(localStorage.getItem("wishlist_items_id") ?? "");
    }
    if (localStorage.getItem("cart_item_id")) {
      this.cartItemArr = JSON.parse(localStorage.getItem("cart_items_id") ?? "");
    }
  }

  //No servera pieprasa visus produktus
  getProducts(): Observable<any> {
    return this.http.get(`${this.url}/products`)
  }

  //No servera pieprasa vienu produktu pēc tā ID
  getOneProduct(id: number): Observable<any> {
    return this.http.get(`${this.url}/products/${id}`)
  }

  //No servera pieprasa visus produktus kategorijā pēc kategorijas
  getCategoryProducts(category: string): Observable<any> {
    return this.http.get(`${this.url}/catalog/${category}`)
  }

  //Pievieno jaunu produktu grozam un saglabā localStorage
  addToCart(id: number): void {
    this.cartItemArr.push(id)
    localStorage.setItem("cart_items_id", JSON.stringify(this.cartItemArr))
  }

  //Iegūst produktu daudzumu grozā
  getCartItemCount(): Map<number, number> {
    let uniqueArray: any[] = [...new Set(JSON.parse(localStorage.getItem("cart_items_id") ?? ""))];
    uniqueArray.forEach((el: number): void => {
      this.cartItemCount.set(el, JSON.parse(localStorage.getItem("cart_items_id") ?? "").filter((x: number): boolean => x === el).length)
    })

    return this.cartItemCount
  }

  //Izņem produktu no groza
  removeFromCart(id: number): void {
    let cartItems = JSON.parse(localStorage.getItem("cart_items_id") ?? "")
    let filteredArray = cartItems.filter((e: number): boolean => e !== id)
    localStorage.setItem("cart_items_id", JSON.stringify(filteredArray))
  }

  //Meklē produktu pēc nosaukuma
  searchForProduct(value: string): Observable<any> {
    return this.http.get(`${this.url}/search/${value}`)
  }

  //Pievieno produktu vēlmju sarakstam un saglabā localStorage
  addToWishlist(id: number): void {
    if (!this.wishlistItemArr.includes(id)) {
      this.wishlistItemArr.push(id)
      console.log(this.wishlistItemArr)
      localStorage.setItem("wishlist_items_id", JSON.stringify(this.wishlistItemArr));
    }
  }

  //Iegūst vēlmju saraksta produktus no servera pēc ID
  getWishlistItems(ids: string): Observable<any> {
    console.log(ids)
    return this.http.post(`${this.url}/wishlist`, {products: `${ids}`})
  }

  //Noņem produktu no vēlmju saraksta
  removeFromWishlist(id: number): void {
    const product_index: number = this.wishlistItemArr.indexOf(id)
    this.wishlistItemArr.splice(product_index, 1)
    localStorage.setItem("wishlist_items_id", JSON.stringify(this.wishlistItemArr))
  }
}
