import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../Interfaces/login.interface";
import {Register} from "../Interfaces/register.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser(data: Login): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/login', data)
  }

  registerUser(data: Register): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/register', data)
  }


}
