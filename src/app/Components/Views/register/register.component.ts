import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../Services/auth.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

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
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;
  error: string = "none";

  constructor(private authService: AuthService, private router: Router) {
  }


  //Izveido formas grupu
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required),
      "password_confirmation": new FormControl("", Validators.required),
      "name": new FormControl("", Validators.required),
      "middle_name": new FormControl(" "),
      "last_name": new FormControl("", Validators.required)
    })
  }


  //Apstrādā formu un nosūta tās datus serverim
  onSubmit(): void {
    if (this.formGroup.status === "VALID") {
      this.authService.registerUser(this.formGroup.value).subscribe({
        next: (response: any): void => {
          localStorage.setItem("token", response.token)
          this.router.navigate(["/account"])
        },
        error: (error: any): void => {
          console.log(error)
          this.error = error.error.message
        }
      })
    } else {
      this.error = "Servera kļūda! Pārbaudiet ievadlaukus."
    }
  }
}
