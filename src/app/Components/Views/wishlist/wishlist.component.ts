import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TitlePipe} from "../../../Pipes/title.pipe";
import {Product} from "../../../Interfaces/product.interface";
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {WishlistService} from "../../../Services/wishlist.service";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    RouterLink,
    TitlePipe
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = "none"

  constructor(private productService: ProductService, private router: Router, private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      this.errorMessage = "403"
      return
    }
    // if (!localStorage.getItem("wishlist_items_id")) return
    this.getWishlistItems()
  }

  //Iegūst vēlmju saraksta produktus no servera
  getWishlistItems(): void {
    this.wishlistService.getWishlistItems().subscribe({
      next: (response: any): void => {
        console.log(response)
        this.errorMessage = "none"
        this.products = response.data
      },
      error: (error: HttpErrorResponse): void => {
        this.errorMessage = "403"
      }
    })
  }


  //Novirza uz produkta skatu
  onGoToProduct(id: number): void {
    this.router.navigate(['product', id])
  }


  //Pievieno produktu grozam
  addToCart(id: number): void {
    this.productService.addToCart(id)
  }


  //Noņem produktu no vēlmju saraksta
  removeFromWishlist(id: number): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (response: any): void => {
        this.getWishlistItems()
      },
      error: (error: HttpErrorResponse): void => {
        console.log(error)
      }
    });
  }
}
