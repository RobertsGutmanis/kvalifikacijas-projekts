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
    full_name: "Procesorus",
    routerLink: "/catalog/CPU",
    image: "https://www.pcworld.com/wp-content/uploads/2024/05/intel-Core-i9-primary-art-edit-1.png"
  },
    {
      name: "GPU",
      full_name: "Video kartes",
      routerLink: "/catalog/GPU",
      image: "https://i.pcmag.com/imagery/articles/01hVN1fJqoxyjlMBE00XRrk-1..v1665765341.jpg"
    },
    {
      name: "RAM",
      full_name: "Atmiņu",
      routerLink: "/catalog/RAM",
      image: "https://cdn.mos.cms.futurecdn.net/3ZKDSdJsuWgVgSAcsFd4PC.jpg"
    },
    {
      name: "SSD",
      full_name: "SSD diskus",
      routerLink: "/catalog/SSD",
      image: "https://wpengine.com/wp-content/uploads/2022/10/What-Is-SSD-Storage-A-Beginners-Guide-Velocitize-1024x465.jpg"
    },
    {
      name: "HDD",
      full_name: "HDD Diskus",
      routerLink: "/catalog/HDD",
      image: "https://jgsuperstore.com/cdn/shop/products/ALL_001_WDPURPLEPRO.png?v=1678932587"
    },
    {
      name: "",
      full_name: "Monitorus",
      routerLink: "/catalog/Monitor",
      image: "https://lgamazingdisplay.com/wp-content/uploads/2020/03/032020_880x440.jpg"
    },
    {
      name: "",
      full_name: "Klaviatūras",
      routerLink: "/catalog/Keyboards",
      image: "https://cdn.dribbble.com/users/4967226/screenshots/18296394/gaming_keyboard_cg_animation.png"
    },
    {
      name: "",
      full_name: "Datorpeles",
      routerLink: "/catalog/Mouse",
      image: "https://lifehacker.com/imagery/articles/01HF2GR9M2NCJVJM1WDFH4D9TC/images-1.fill.size_2000x1126.v1699835057.png"
    },
    {
      name: "",
      full_name: "Korpusus",
      routerLink: "/catalog/Case",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/5/309335140/BH/WM/ZJ/158405824/511-mt-gaming-pc-cabinet-500x500.jpg"
    },
    {
      name: "PSU",
      full_name: "Barošanas blokus",
      routerLink: "/catalog/PSU",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfg3-LQPRBomaa_LMz2s2txAojo_OpGb1tSg&usqp=CAU"
    },
    {
      name: "",
      full_name: "Austiņas",
      routerLink: "/catalog/Headphone",
      image: "https://asia-latinamerica-mea.yamaha.com/en/files/header_headphone_sp_740x400_419b72d665b464d42b78ff3b4127e9d3.jpg"
    },
    {
      name: "",
      full_name: "Aksesuārus",
      routerLink: "/catalog/Accessory",
      image: "https://hardwarecanucks.com/wp-content/uploads/How-To-PROPERLY-Add-RGB-50-960x480.png"
    },
  ]
}
