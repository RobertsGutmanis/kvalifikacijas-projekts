import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../Services/auth.service";
import {CheckoutService} from "../../../Services/checkout.service";

@Component({
  selector: 'app-orders',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  orders!: any[];
  constructor(private authService: AuthService, private router: Router, private checkoutService: CheckoutService) {
  }

  ngOnInit() : void{
    this.checkoutService.getOrders().subscribe({
      next: (value: any): void=>{
        this.orders = value.data;
      }
    })
  }

  //Izvada lietotāju no konta un noved uz sākuma skatu
  onLogout(): void {
    this.authService.logout().subscribe({
      next: (response: void): void => {
        localStorage.clear()
        this.router.navigate(["/"])
      },
      error: (error: HttpErrorResponse): void => {
        alert("Can not log out!")
      }
    })
  }

  onDelete(): void{
    const toDelete: boolean = confirm("Vai tiešām vēlaties dzēst savu kontu?");
    if(!toDelete) return

    this.authService.deleteUser().subscribe({
      next: (): void=>{
        localStorage.clear()
        this.router.navigate(['/'])
      },
      error: (error: HttpErrorResponse): void=>{
        alert(error.error.message)
      }
    })
  }
}
