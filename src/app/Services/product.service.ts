import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/products`)
  }

  getOneProduct(id: number): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/products/${id}`)
  }

  getCategoryProducts(category: string): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/catalog/${category}`)
  }
}
