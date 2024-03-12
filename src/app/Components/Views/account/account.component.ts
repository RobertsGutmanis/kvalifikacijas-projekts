import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UserData} from "../../../Interfaces/user_data.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {

  userData!: UserData;

  constructor(private authService: AuthService, private router: Router) {
    // if(!localStorage.getItem("token")) this.router.navigate(["/login"]);
  }

  //Iegūst lietotāja datus no servera un saglabā tos mainīgajā
  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (response: any): void => {
        this.userData = response.data;
      },
      error: (error: HttpErrorResponse): void => {
        // this.router.navigate(["/login"])
      }
    })
  }

  //Izvada lietotāju no konta un noved uz sākuma skatu
  onLogout(): void {
    this.authService.logout().subscribe({
      next: (response: void): void => {
        localStorage.clear()
        this.router.navigate(["/"])
      },
      error: (error: HttpErrorResponse): void => {
        alert("Can not log out!")
      }
    })
  }

}
