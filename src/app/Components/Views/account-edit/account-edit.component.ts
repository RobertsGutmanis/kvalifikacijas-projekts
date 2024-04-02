import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss'
})
export class AccountEditComponent implements OnInit{
  errorMessage: string = "none";
  formGroup!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() : void{

    this.formGroup = new FormGroup({
      "name": new FormControl(""),
      "middle_name": new FormControl(""),
      "last_name": new FormControl(""),
      "phone_num": new FormControl(""),
      "country": new FormControl(""),
      "city": new FormControl(""),
      "address": new FormControl(""),
      "zip": new FormControl("")
    });

    this.authService.getUser().subscribe({
      next: (response: any): void => {
        this.formGroup = new FormGroup({
          "name": new FormControl(response.data.name, Validators.required),
          "middle_name": new FormControl(response.data.middle_name),
          "last_name": new FormControl(response.data.last_name, Validators.required),
          "phone_num": new FormControl(response.data.phone_num),
          "country": new FormControl(response.data.country),
          "city": new FormControl(response.data.city),
          "address": new FormControl(response.data.address),
          "zip": new FormControl(response.data.zip)
        });
      },
      error: (error: HttpErrorResponse): void => {
        this.router.navigate(["/login"])
      }
    })
  }

  onSubmit(): void{
    this.authService.updateUser(this.formGroup.value).subscribe({
       next: (response: any): void =>{
         this.router.navigate(['/account'])
      },
      error: (error: HttpErrorResponse): void=>{
          this.errorMessage = "Server error!"
       }
    })
  }
}
