import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItems: Product[] = [];
  totalPrice: number = 0;
  constructor(private productService: ProductService) {
  }


  ngOnInit(): void {
    this.getCartItems()
  }
  getCartItems(): void{
    this.productService.getCartItemCount().forEach((count: any, key: any): void => {
      this.productService.getOneProduct(key).subscribe({
        next: (value: any): void => {
          value.count = count;
          value.totalPrice = value.count * value.price
          this.cartItems.push(value)
          this.totalPrice = this.totalPrice + value.totalPrice
        },
        error: (error: HttpErrorResponse): void => {
          console.log(error);
        },
      });
    });
  }

  removeFromCart(id: number): void{
    this.productService.removeFromCart(id)
    this.totalPrice = 0;
    this.cartItems.forEach((product: Product, index: number): void=>{
      if(product.id === id){
        this.cartItems.splice(index, 1)
      }
    })
    this.cartItems.forEach((product: Product, index: number): void=>{
      if(product.totalPrice){
        this.totalPrice = this.totalPrice + product.totalPrice
      }
    })

  }
}
