import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { ShoppingCartService } from '../core/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  cartItemsCount: number = 0;

  constructor(private authService: AuthService, private shoppingCartService : ShoppingCartService) {}


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isTokenValid();
    this.isAdmin = this.authService.isAdmin();

    this.authService.currentUser.subscribe(user=>{
      this.isLoggedIn = !!user;
    });

    this.shoppingCartService.getCartItemCount().subscribe((count:number) => {
      this.cartItemsCount = count;
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/';
  }
}
