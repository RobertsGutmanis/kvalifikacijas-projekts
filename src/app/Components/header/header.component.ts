import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  showSidebar: boolean = false;
  formGroup!: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "search": new FormControl('', Validators.required)
    })
  }

  authRoute(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(["/account"])
    } else {
      this.router.navigate(["/login"])
    }
  }

  onSubmit(): void {
    this.router.navigate(["/search", this.formGroup.value.search]).then((): void => {
      window.location.reload();
    });
    this.formGroup.reset()
  }
}
