import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: Vehicle[] = [];
  totalAmount: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartItems = this.shoppingCartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
