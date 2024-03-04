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

  //Izveido formas grupu priekš meklēšanas
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      "search": new FormControl('', Validators.required)
    })
  }

  //Novirza lietotājus uz login vai account skatiem attiecīgi pēc to statusa
  authRoute(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(["/account"])
    } else {
      this.router.navigate(["/login"])
    }
  }

  //Novirza lietotāju uz meklēšanas skatu, pēc meklēšanas formas iesniegšanas
  onSubmit(): void {
    if(this.formGroup.status==="INVALID") return
    this.router.navigate(["/search", this.formGroup.value.search]).then((): void => {
      window.location.reload();
    });
    this.formGroup.reset()
  }
}
