import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./Components/header/header.component";
import {FooterComponent} from "./Components/footer/footer.component";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'kvalf-frontend';

  ngOnInit(): void {
    initFlowbite();

    setTimeout((): void=>{
      // console.clear()
    }, 1000)
  }
}
