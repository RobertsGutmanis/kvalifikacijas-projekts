import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../Services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";
import {Specifications} from "../../../Interfaces/specifications.interface";

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

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute, private router: Router) {
    this.productId = this.activeRoute.snapshot.params['id']
    if (this.productId === 0 || isNaN(this.productId)) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.productService.getOneProduct(this.productId).subscribe({
      next: (response: any): void => {
        this.product = response.product;
        this.specifications = response.specification
      },
      error: (error: HttpErrorResponse): void => {
        console.log(error)
      }
    })
  }

  onAddToWishlist(id: number): void {
    this.productService.addToWishlist(id)
  }
}
