import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
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

  constructor(private authService: AuthService) {
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
          alert("user created")
          localStorage.setItem("token", response.token)
          this.formGroup.reset()
          this.error = "none"
        },
        error: (error: HttpErrorResponse): void=>{
          console.log(error)
        }
      })
    } else {
      this.error = "Authentication error!"
    }
  }
}
