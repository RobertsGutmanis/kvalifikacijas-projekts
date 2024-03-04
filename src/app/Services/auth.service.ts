import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "../Interfaces/login.interface";
import {Register} from "../Interfaces/register.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = `http://localhost:8000/api`

  constructor(private http: HttpClient) {
  }

  //Nosūta login datus uz serveri
  loginUser(data: Login): Observable<any> {
    return this.http.post(`${this.url}/login`, data)
  }

  //Nosūta register datus uz serveri
  registerUser(data: Register): Observable<any> {
    return this.http.post(`${this.url}/register`, data)
  }

  //Iegūst lietotāja datus no servera
  getUser(): Observable<any> {
    return this.http.get(`${this.url}/user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
      }),
    })
  }

  logout(): Observable<any> {
    return this.http.post(`${this.url}/logout`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`
      }),
    })
  }


}
