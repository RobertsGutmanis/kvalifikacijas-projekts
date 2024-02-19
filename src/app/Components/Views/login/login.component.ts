import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../Services/auth.service";
import {readSpanComment} from "@angular/compiler-cli/src/ngtsc/typecheck/src/comments";

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
export class LoginComponent implements OnInit{
  formGroup!: FormGroup;
  error: string = "none";

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void{
    this.formGroup = new FormGroup({
      "email": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    })
  }

  onSubmit(): void{
    if(this.formGroup.status==="VALID"){
      this.authService.loginUser(this.formGroup.value).subscribe({
        next: (response: any): void=>{
          alert("Login good")
          localStorage.setItem("token", response.token)
          this.formGroup.reset()
          this.error = "none"
        },
        error: (error: any): void=>{
          this.error = error.error.message
        }
      })
    }else{
      this.error = "Authentication error!"
    }
  }
}
