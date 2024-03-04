import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common'
import {Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../Services/product.service";
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
export class HomeComponent implements OnInit {

  products!: Product[];

  constructor(private router: Router, private productService: ProductService) {
  }

  //Iegūst 4 jaunākos produktus, kurus izvadīt lietotājam
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response: any): void => {
        this.products = response.data.slice(0, 4);
      },
      error: (error: HttpErrorResponse): void => {
        console.log(error)
      }
    })
  }


  //Aizved lietotāju uz produkta skatu
  onGoToProduct(id: number): void {
    this.router.navigate(['product', id])
  }


  //Pievieno konkrēto produktu grozam
  addToCart(id: number): void {
    this.productService.addToCart(id)
  }
}
