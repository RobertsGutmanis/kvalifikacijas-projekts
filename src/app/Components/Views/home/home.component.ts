import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common'
import {Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../Services/product.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products!: Product[];

  constructor(private router: Router, private productService: ProductService, private toastr: ToastrService, private http: HttpClient) {
  }

  //Iegūst 4 jaunākos produktus, kurus izvadīt lietotājam
  ngOnInit(): void {
    this.productService.getProducts()?.subscribe({
      next: (response: any): void => {
        console.log(response)
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
    if(!localStorage.getItem("token")){
      this.toastr.error('Vispirms nepieciešams autentificēties!');
      return
    }
    this.productService.addToCart(id)
  }
}
