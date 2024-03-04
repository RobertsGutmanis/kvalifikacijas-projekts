import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  countArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getCartItems()
  }

  //Iegūst visas groza preces, saglabā tās maibīgajā un aprēķina groza kopējo summu
  getCartItems(): void {
    this.productService.getCartItemCount().forEach((count: any, key: any): void => {
      this.productService.getOneProduct(key).subscribe({
        next: (value: any): void => {
          value.product.count = count;
          value.product.totalPrice = value.product.count * value.product.price
          this.cartItems.push(value.product)
          this.totalPrice = this.totalPrice + value.product.totalPrice
        },
        error: (error: HttpErrorResponse): void => {
          console.log(error);
        },
      });
    });
  }

  //Izņem preci no groza un no jauna aprēķina groza kopējo summu
  removeFromCart(id: number): void {
    this.productService.removeFromCart(id)
    this.totalPrice = 0;
    this.cartItems.forEach((product: Product, index: number): void => {
      if (product.id === id) {
        this.cartItems.splice(index, 1)
      }
    })
    this.cartItems.forEach((product: Product, index: number): void => {
      this.totalPrice = this.totalPrice + (product.totalPrice ?? 0)
    })

  }

  //Nosaka vai lietotājs mainījis preces daudzumu grozā uz lielāku vai mazāku un saglabā to
  onChangeCount(count: string, id: number): void {
    this.totalPrice = 0;
    const idsArr: number[] = JSON.parse(localStorage.getItem("cart_items_id") ?? "")
    const idCount: number = idsArr.filter((id_num: number) : boolean => id_num === id).length

    if(idCount < +count){
      const difference: number = +count - idCount
      for(let i: number = 0; i < difference; i++){
        idsArr.push(id)
      }
    }
    else if(idCount > +count){
      const difference: number = (+count - idCount) * -1
      for(let i: number = 0; i < difference; i++){
        let currentIndex: number = idsArr.indexOf(id)
        idsArr.splice(currentIndex, 1)
      }
    }
    localStorage.setItem("cart_items_id", JSON.stringify(idsArr))
    this.changePrices(id)
  }

  //Kalkulē produktu cenas un groza kopējo cenu
  changePrices(id: number): void{
    const idsArr: number[] = JSON.parse(localStorage.getItem("cart_items_id") ?? "")
    this.cartItems.forEach((item: Product): void=>{
      if(item.id === id){
        item.count = idsArr.filter((id_num: number) : boolean => id_num === id).length
        item.totalPrice = item.price * item.count
      }
      this.totalPrice = this.totalPrice + (item.totalPrice ?? 0);
    })
  }
}
