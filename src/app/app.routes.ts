import { Routes } from '@angular/router';
import {HomeComponent} from "./Components/Views/home/home.component";
import {CartComponent} from "./Components/Views/cart/cart.component";
import {ProductComponent} from "./Components/Views/product/product.component";
import {LoginComponent} from "./Components/Views/login/login.component";
import {RegisterComponent} from "./Components/Views/register/register.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product', component: ProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
