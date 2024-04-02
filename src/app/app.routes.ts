import {Routes} from '@angular/router';
import {HomeComponent} from "./Components/Views/home/home.component";
import {CartComponent} from "./Components/Views/cart/cart.component";
import {ProductComponent} from "./Components/Views/product/product.component";
import {LoginComponent} from "./Components/Views/login/login.component";
import {RegisterComponent} from "./Components/Views/register/register.component";
import {AccountComponent} from "./Components/Views/account/account.component";
import {CatalogComponent} from "./Components/Views/catalog/catalog.component";
import {SearchComponent} from "./Components/Views/search/search.component";
import {WishlistComponent} from "./Components/Views/wishlist/wishlist.component";
import {CategoriesComponent} from "./Components/Views/categories/categories.component";
import {ContactComponent} from "./Components/Views/contact/contact.component";
import {AccountEditComponent} from "./Components/Views/account-edit/account-edit.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent},
  {path: 'catalog/:category', component: CatalogComponent},
  {path: 'search/:value', component: SearchComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'account/edit', component: AccountEditComponent}
];
