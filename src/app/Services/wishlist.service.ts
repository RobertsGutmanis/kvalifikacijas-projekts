import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

class EmptyObservable {
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistItemArr: number[] = [];
  url: string = `https://api2.rgutmanis.com/api`
  // url: string = `http://localhost:8000/api`

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }


  //Pievieno produktu vēlmju sarakstam un saglabā localStorage
  addToWishlist(id: number): any {
    if(!localStorage.getItem("token")){
      this.toastr.error('Vispirms nepieciešams autentificēties!');
      return
    }

    if(localStorage.getItem("wishlist_items_id")){
      this.wishlistItemArr = JSON.parse(localStorage.getItem("wishlist_items_id") ?? JSON.stringify([]))
    }else{
      this.wishlistItemArr = []
    }
    if (!this.wishlistItemArr.includes(id)) {
      this.wishlistItemArr.push(id)
      localStorage.setItem("wishlist_items_id", JSON.stringify(this.wishlistItemArr));
      this.toastr.info("Produkts pievienots vēlmju sarakstam!")
      return this.http.post(`${this.url}/wishlist`, {"product_id": id}, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
        }),
      })
    } else {
      this.toastr.info("Product already in wishlist!")
      return new EmptyObservable();
    }
  }

  //Iegūst vēlmju saraksta produktus no servera pēc ID
  getWishlistItems(): Observable<any> {
    return this.http.get(`${this.url}/wishlist`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
      }),
    })
  }

  //Noņem produktu no vēlmju saraksta
  removeFromWishlist(id: number): any {
    const product_index: number = this.wishlistItemArr.indexOf(id)
    this.wishlistItemArr.splice(product_index, 1)
    this.toastr.error("Product removed from wishlist!");
    localStorage.setItem("wishlist_items_id", JSON.stringify(this.wishlistItemArr))
    return this.http.post(`${this.url}/wishlist/delete`, {product_id: id}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
      }),
    })
  }
}
