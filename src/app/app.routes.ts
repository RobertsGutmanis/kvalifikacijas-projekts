import { Routes } from '@angular/router';
import {HomeComponent} from "./Components/Views/home/home.component";
import {CartComponent} from "./Components/Views/cart/cart.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent}
];
