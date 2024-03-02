import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TitlePipe} from "../../../Pipes/title.pipe";
import {Product} from "../../../Interfaces/product.interface";
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem("wishlist_items_id")) return
    this.getWishlistItems()
  }

  getWishlistItems(): void {
    this.productService.getWishlistItems(localStorage.getItem("wishlist_items_id") ?? "").subscribe({
      next: (response: any): void => {
        this.products = response.data
      },
      error: (error: HttpErrorResponse): void => {
        console.log(error)
      }
    })
  }

  onGoToProduct(id: number): void {
    this.router.navigate(['product', id])
  }

  addToCart(id: number): void {
    this.productService.addToCart(id)
  }

  removeFromWishlist(id: number): void {
    this.productService.removeFromWishlist(id)
    this.getWishlistItems()
  }
}
