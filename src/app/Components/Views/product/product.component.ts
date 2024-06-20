import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../Services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";
import {Specifications} from "../../../Interfaces/specifications.interface";
import {WishlistService} from "../../../Services/wishlist.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  productId!: number;
  product!: Product;
  specifications: Specifications[] = []

  //Iegūst produkta ID no URL
  constructor(private productService: ProductService, private activeRoute: ActivatedRoute, private router: Router, private wishlistService: WishlistService, private toastr: ToastrService) {
    this.productId = this.activeRoute.snapshot.params['id']
    if (this.productId === 0 || isNaN(this.productId)) {
      this.router.navigate(['/'])
    }
  }

  //Iegūst produktu no servera un saglabā to mainīgajā
  ngOnInit(): void {
    this.productService.getOneProduct(this.productId).subscribe({
      next: (response: any): void => {
        this.product = response.product;
        this.specifications = response.specification

        if(!this.product){
          this.router.navigate(['/'])
        }
      },
      error: (error: HttpErrorResponse): void => {
        this.router.navigate(['/'])
      }
    })
  }

  //Pievieno produktu grozam
  onAddToCart(id: number): void {
    this.productService.addToCart(id)
  }

  //Pievieno produktu vēlmju sarakstam
  onAddToWishlist(id: number): void {

    if(!localStorage.getItem("token")){
      this.toastr.error('Vispirms nepieciešams autentificēties!');
      return
    }
    this.wishlistService.addToWishlist(id).subscribe({
      next: (response: any): void => {
      },
      error: (error: HttpErrorResponse): void => {
        this.toastr.error('Radās kļūda pievienojot produktu vēlmju sarakstam!');
      }
    });
  }
}
