import {Component, OnInit} from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router) {
  }
  ngOnInit(): void{
    // location.reload()
  }
}
