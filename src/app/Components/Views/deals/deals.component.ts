import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TitlePipe} from "../../../Pipes/title.pipe";
import {Product} from "../../../Interfaces/product.interface";
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [
    RouterLink,
    TitlePipe,
    NgOptimizedImage
  ],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})
export class DealsComponent implements OnInit{
  parameter!: string;
  immutableProducts: Product[] = [];
  products: Product[] = [];
  manufacturers: string[] = [];
  manufacturerFilter: string[] = [];
  currentPriceRange: number = 1;
  highestPrice: number = 0;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  //Iegūst visus kataloga produktus un saglabā tos mainīgajos, aprēķina augstako cenu un nosaka visus ražotājus kādi ir produktiem
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response: any): void=>{
        response.data.forEach((el: Product): void=>{
          if(el.price!=el.last_price){
            this.immutableProducts.push(el)
            this.products.push(el)
            if(el.price > this.highestPrice){
              this.highestPrice = el.price
            }
            if(!this.manufacturers.includes(el.manufacturer)){
              this.manufacturers.push(el.manufacturer)
            }
          }
        })
      },
      error: (error: HttpErrorResponse): void => {
        console.log(error)
      }
    })
  }

  //Novada lietotāju uz konkrēto produktu
  onGoToProduct(id: number): void {
    this.router.navigate(['product', id])
  }

  //Filtrē kādi produkti tiks izvadīti pēc tā ražotāja
  filterManufacturer(manufacturer: string): void {
    if (this.manufacturerFilter.includes(manufacturer)) {
      let index: number = this.manufacturerFilter.indexOf(manufacturer);
      this.manufacturerFilter.splice(index, 1);
    } else {
      this.manufacturerFilter.push(manufacturer)
    }


    if (this.manufacturerFilter.length === 0) {
      this.products = this.immutableProducts.filter((data: any): boolean => true).filter((product: Product): boolean => product.price >= this.currentPriceRange);
    } else {
      let placeholderArray: Product[] = [];
      this.manufacturerFilter.forEach((filter: string, index: number): void => {
        let productArray: Product[] = this.immutableProducts.filter((data: any): boolean => true)
          .filter((product: Product): boolean => {
            return product.manufacturer.includes(filter);
          }).filter((product: Product): boolean => product.price >= this.currentPriceRange);
        placeholderArray.push(...productArray);
      });
      this.products = placeholderArray;
    }
  }


  //Pievieno produktu grozam
  addToCart(id: number): void {
    this.productService.addToCart(id)
  }

  //Izvada produktus cenu kategorijā pēc klienta izveles
  onPriceChange(value: any): void {
    this.currentPriceRange = +value;
    if(this.manufacturerFilter.length>0){
      this.products = this.immutableProducts
        .filter((product: Product): boolean => product.price >= +value)
        .filter((product: Product): boolean => this.manufacturerFilter.includes(product.manufacturer));
    }
    else {
      this.products = this.immutableProducts.filter((product: Product): boolean => product.price >= +value)
    }
  }


  //Sakārto produktus pēc klienta izvēles
  onSortChange(sort: string): void {
    if (sort === "new") {
      this.products = this.immutableProducts.filter((data: any): boolean => true)
        .filter((product: Product): boolean => product.price >= this.currentPriceRange)
        .filter((product: Product): boolean => this.manufacturerFilter.includes(product.manufacturer));
    } else if (sort === "low") {
      this.products = this.products.sort(this.sortPriceLow)
    } else if (sort === "high") {
      this.products = this.products.sort(this.sortPriceHigh)
    }
  }

  //Sakārto masīvu pēc price vērtības no zemākās uz augstāko
  sortPriceLow(a: any, b: any): number {
    return a.price - b.price;
  }

  //Sakārto masīvu pēc price vērtības no augstākās uz zemāko
  sortPriceHigh(a: any, b: any): number {
    return b.price - a.price;
  }
}
