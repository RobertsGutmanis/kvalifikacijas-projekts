import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showSidebar: boolean = false;

  constructor(private router: Router) {
  }

  authRoute(): void{
    if(localStorage.getItem("token")){
      this.router.navigate(["/account"])
    }else{
      this.router.navigate(["/login"])
    }
  }
}
