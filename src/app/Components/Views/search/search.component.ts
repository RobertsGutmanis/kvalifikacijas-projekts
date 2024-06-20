import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductService} from "../../../Services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../Interfaces/product.interface";
import {TitlePipe} from "../../../Pipes/title.pipe";
import {ToastrService} from "ngx-toastr";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterLink,
    TitlePipe,
    NgOptimizedImage
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchParam: string;
  immutableProducts!: Product[];
  products: Product[] = [];
  manufacturers: string[] = [];
  manufacturerFilter: string[] = [];
  currentPriceRange: number = 1;

  //Iegūst meklējamo vērtību no URL
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private router: Router, private toastr: ToastrService) {
    this.searchParam = this.activeRoute.snapshot.params['value']
    console.log(this.searchParam)
  }

  //Iegūst produktus no servera pēc meklējamās vērtības un saglabā mainīgajos
  ngOnInit(): void {
    this.productService.searchForProduct(this.searchParam).subscribe({
      next: (response: any): void => {
        this.products = response.data.filter((data: any): boolean => true)
        this.immutableProducts = response.data.filter((data: any): boolean => true)
        this.products.forEach((Product: Product): void => {
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


  //Noved uz produkta skatu
  onGoToProduct(id: number): void {
    this.router.navigate(['product', id])
  }

  //Filtrē produktus pēc to ražotāja
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

  //Izvada produktus pēc cenu diapazona
  onPriceChange(value: any): void {
    this.currentPriceRange = +value;
    this.products = this.immutableProducts.filter((product: Product): boolean => product.price >= +value)
  }

  //Izvada produktus pēc klienta filtra
  onSortChange(sort: string): void {
    console.log(this.manufacturerFilter)
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
