import {Component, OnInit} from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../Services/product.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  products!: Product[];

  constructor(private router: Router, private productService: ProductService) {
  }
  ngOnInit(): void{
    this.productService.getProducts().subscribe({
      next: (response: any): void=>{
        this.products = response.data.slice(0, 4);
      },
      error: (error: HttpErrorResponse): void=>{
        console.log(error)
      }
    })
  }

  onGoToProduct(id: number): void{
    this.router.navigate(['product', id])
  }
}
