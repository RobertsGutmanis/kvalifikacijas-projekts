import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {EmailService} from "../../../Services/email.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  formGroup!: FormGroup;
  errorMessage: string = "none";
  emailError: boolean = false;
  nameError: boolean = false;
  topicError: boolean = false;
  messageError: boolean = false;

  constructor(private emailService: EmailService, private toastr: ToastrService) {
  }

  //Izveido formas grupu apstrādei
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "name": new FormControl('', Validators.required),
      "topic": new FormControl('', Validators.required),
      "message": new FormControl('', Validators.required)
    })
  }

  //Pārbauda vai formā ir kļūdas un tās datus nosūta tālāk
  onSubmit(): void {
    if (this.formGroup.status === "INVALID") {
      this.errorMessage = "Nav aizpildīti visi lauki!";

      this.formGroup.controls["email"].errors ? this.emailError = true : this.emailError = false;
      this.formGroup.controls["name"].errors ? this.nameError = true : this.nameError = false
      this.formGroup.controls["topic"].errors ? this.topicError = true : this.topicError = false
      this.formGroup.controls["message"].errors ? this.messageError = true : this.messageError = false
      return
    } else {
      this.emailError = false;
      this.nameError = false;
      this.topicError = false;
      this.messageError = false
      this.errorMessage = "none";

      const subject: string = `E-pasts no ${this.formGroup.value.email} - ${this.formGroup.value.name}`
      const text: string = `Topic - ${this.formGroup.value.topic}, Message - ${this.formGroup.value.message}`

      this.emailService.sendEmail({subject: subject, text: text}).subscribe({
        next: (): void=>{
          this.toastr.success("Jūsu ziņa tika nosūtīta!")
          this.formGroup.reset()
        }
      })
    }
  }
}
