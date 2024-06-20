import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../Services/auth.service";
import {WishlistService} from "../../../Services/wishlist.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  error: string = "none";

  constructor(private authService: AuthService, private router: Router, private wishlistService: WishlistService, private toastr: ToastrService) {
  }


  //Izveido formas grupu
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required)
    })
  }


  //Apstrādā formas datus un nosūta serverim, saglabā žetonu localStorage
  onSubmit(): void {
    if (this.formGroup.status === "VALID") {
      this.authService.loginUser(this.formGroup.value).subscribe({
        next: (response: any): void => {
          localStorage.setItem("token", response.token)
          this.wishlistService.getWishlistItems().subscribe({
            next: (): void=>{
              this.router.navigate(["/account"])
            },
            error: (): void=>{

            }
          })
        },
        error: (error: any): void => {
          this.error = error.error.message
        }
      })
    } else {
      this.error = "Lūdzu aizpildiet visus laukus!"
    }
  }
}
