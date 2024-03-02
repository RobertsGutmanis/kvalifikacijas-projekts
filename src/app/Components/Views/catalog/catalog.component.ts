import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";
import {TitlePipe} from "../../../Pipes/title.pipe";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    RouterLink,
    TitlePipe
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  parameter!: string;
  immutableProducts!: Product[];
  products: Product[] = [];
  manufacturers: string[] = [];
  manufacturerFilter: string[] = [];
  currentPriceRange: number = 100;
  highestPrice: number = 0;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.parameter = this.activeRoute.snapshot.paramMap.get('category') ?? "";
    this.productService.getCategoryProducts(this.parameter).subscribe({
      next: (response: any): void => {
        this.products = response.data.filter((data: any): boolean => true)
        this.immutableProducts = response.data.filter((data: any): boolean => true)
        this.products.forEach((Product: Product): void => {
          if (Product.price > this.highestPrice) {
            this.highestPrice = Product.price
          }
          if (!this.manufacturers.includes(Product.manufacturer)) {
            this.manufacturers.push(Product.manufacturer)
          }
        })
      },
      error: (error: HttpErrorResponse): void => {
        console.log(error)
      }
    })
  }

  onGoToProduct(id: number): void {
    this.router.navigate(['product', id])
  }

  filterManufacturer(manufacturer: string): void {
    if (this.manufacturerFilter.includes(manufacturer)) {
      let index: number = this.manufacturerFilter.indexOf(manufacturer);
      this.manufacturerFilter.splice(index, 1);
    } else {
      this.manufacturerFilter.push(manufacturer)
    }


    if (this.manufacturerFilter.length === 0) {
      this.products = this.immutableProducts.filter((data: any): boolean => true)
    } else {
      let placeholderArray: Product[] = [];
      this.manufacturerFilter.forEach((filter: string, index: number): void => {
        let productArray: Product[] = this.immutableProducts.filter((data: any): boolean => true)
          .filter((product: Product): boolean => {
            return product.manufacturer.includes(filter);
          });
        placeholderArray.push(...productArray);
      });
      this.products = placeholderArray;
    }
  }

  addToCart(id: number): void {
    this.productService.addToCart(id)
  }

  onPriceChange(value: any): void {
    this.currentPriceRange = +value;
    this.products = this.immutableProducts.filter((product: Product): boolean => product.price >= +value)
  }

  onSortChange(sort: string): void {
    if (sort === "new") {
      this.products = this.immutableProducts.filter((data: any): boolean => true)
      console.log(this.immutableProducts)
    } else if (sort === "low") {
      this.products = this.products.sort(this.sortPriceLow)
    } else if (sort === "high") {
      this.products = this.products.sort(this.sortPriceHigh)
    }
  }

  sortPriceLow(a: any, b: any): number {
    return a.price - b.price;
  }

  sortPriceHigh(a: any, b: any): number {
    return b.price - a.price;
  }
}
