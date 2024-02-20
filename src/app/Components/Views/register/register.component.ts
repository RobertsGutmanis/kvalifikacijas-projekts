import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../Services/auth.service";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  formGroup!: FormGroup;
  error: string = "none";

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void{
    this.formGroup = new FormGroup({
      "email": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
      "password_confirmation": new FormControl("", Validators.required),
      "name": new FormControl("", Validators.required),
      "middle_name": new FormControl("", Validators.required),
      "last_name": new FormControl("", Validators.required)
    })
  }

  onSubmit(): void {
    if (this.formGroup.status === "VALID") {
      this.authService.registerUser(this.formGroup.value).subscribe({
        next: (response: any): void=>{
          localStorage.setItem("token", response.token)
          this.router.navigate(["/account"])
        },
        error: (error: any): void=>{
          this.error = error.error.message
        }
      })
    } else {
      this.error = "Authentication error!"
    }
  }
}
