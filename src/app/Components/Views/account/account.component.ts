import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../Services/auth.service";
import {resolve} from "@angular/compiler-cli";
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
export class AccountComponent implements OnInit{

  userData!: UserData;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (response: any): void=>{
        this.userData = response.data;
      },
      error: (error: HttpErrorResponse): void=>{
        console.log(error)
      }
    })
  }

  onLogout(): void{
    this.authService.logout().subscribe({
      next: (response: void): void=>{
        localStorage.clear()
        this.router.navigate(["/"])
      },
      error: (error: HttpErrorResponse): void=>{
        alert("Can not log out!")
      }
    })
  }

}
