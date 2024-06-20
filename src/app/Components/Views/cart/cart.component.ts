import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  countArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  cartItems: Product[] = [];
  totalPrice: number = 0;
  views: string = "cart";
  formGroup!: FormGroup;

  constructor(private productService: ProductService, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("cart_items_id")) {
      this.getCartItems()
    }

    this.formGroup = new FormGroup({
      "name": new FormControl(""),
      "middle_name": new FormControl(""),
      "last_name": new FormControl(""),
      "phone_num": new FormControl(""),
      "country": new FormControl(""),
      "city": new FormControl(""),
      "address": new FormControl(""),
      "zip": new FormControl("")
    });

    this.authService.getUser().subscribe({
      next: (response: any): void => {
        this.formGroup = new FormGroup({
          "name": new FormControl(response.data.name, Validators.required),
          "middle_name": new FormControl(response.data.middle_name),
          "last_name": new FormControl(response.data.last_name, Validators.required),
          "phone_num": new FormControl(response.data.phone_num),
          "country": new FormControl(response.data.country),
          "city": new FormControl(response.data.city),
          "address": new FormControl(response.data.address),
          "zip": new FormControl(response.data.zip)
        });
      },
    })
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
    const idCount: number = idsArr.filter((id_num: number): boolean => id_num === id).length

    if (idCount < +count) {
      const difference: number = +count - idCount
      for (let i: number = 0; i < difference; i++) {
        idsArr.push(id)
      }
    } else if (idCount > +count) {
      const difference: number = (+count - idCount) * -1
      for (let i: number = 0; i < difference; i++) {
        let currentIndex: number = idsArr.indexOf(id)
        idsArr.splice(currentIndex, 1)
      }
    }
    localStorage.setItem("cart_items_id", JSON.stringify(idsArr))
    this.changePrices(id)
  }

  //Kalkulē produktu cenas un groza kopējo cenu
  changePrices(id: number): void {
    const idsArr: number[] = JSON.parse(localStorage.getItem("cart_items_id") ?? "")
    this.cartItems.forEach((item: Product): void => {
      if (item.id === id) {
        item.count = idsArr.filter((id_num: number): boolean => id_num === id).length
        item.totalPrice = item.price * item.count
      }
      this.totalPrice = this.totalPrice + (item.totalPrice ?? 0);
    })
  }

  changeView(): void{
    if(!localStorage.getItem("token")){
      this.toastr.error('Vispirms nepieciešams autentificēties!');
      return
    }
    if(!localStorage.getItem("cart_items_id") || JSON.parse(localStorage.getItem("cart_items_id") ?? "").length === 0){
      this.toastr.error('Grozs ir tukšs!');
      return
    }
    if(this.views==="cart") this.views = "address"
    else if(this.views==="address") this.views = "checkout"
  }

  onSubmitAddress(): void{
    this.authService.updateUser(this.formGroup.value).subscribe({
      next: (response: any): void =>{

      },
      error: (error: HttpErrorResponse): void=>{

      }
    })
  }

  ngOnDestroy() : void{
    this.views = "cart";
    this.getCartItems()
  }
}
