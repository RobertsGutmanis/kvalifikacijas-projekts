import {Component} from '@angular/core';
import {CategoryObject} from "../../../Interfaces/category_object.interface";
import {RouterLink} from "@angular/router";
import {ParenthesesPipe} from "../../../Pipes/parentheses.pipe";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterLink,
    ParenthesesPipe
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: CategoryObject[] = [{
    name: "CPU",
    full_name: "Processors",
    routerLink: "/catalog/CPU",
    image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
  },
    {
      name: "GPU",
      full_name: "Video Cards",
      routerLink: "/catalog/GPU",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "RAM",
      full_name: "Memory",
      routerLink: "/catalog/RAM",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "SSD",
      full_name: "Solid State Drives",
      routerLink: "/catalog/SSD",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "HDD",
      full_name: "Hard Disk Drives",
      routerLink: "/catalog/HDD",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "",
      full_name: "Monitors",
      routerLink: "/catalog/Monitor",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "",
      full_name: "Keyboards",
      routerLink: "/catalog/Keyboards",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "",
      full_name: "Mouses",
      routerLink: "/catalog/Mouse",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "",
      full_name: "Cases",
      routerLink: "/catalog/Case",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "PSU",
      full_name: "Power Supplies",
      routerLink: "/catalog/PSU",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "",
      full_name: "Headphones",
      routerLink: "/catalog/Headphone",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
    {
      name: "",
      full_name: "Accessories",
      routerLink: "/catalog/Accessory",
      image: "https://www.newegg.com/insider/wp-content/uploads/2015/03/iStock_000021630424_Large.jpg"
    },
  ]
}
