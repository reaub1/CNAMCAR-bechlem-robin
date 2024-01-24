import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { Vehicle } from '../../core/models/vehicle.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Vehicle[] = [];
  total: number = 0;

  notificationMessage: string = '';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.currentNotification.subscribe(message => this.notificationMessage = message);
    this.cartItems = this.shoppingCartService.getCartItems();
    this.shoppingCartService.getTotalCartPrice().subscribe(total => {
      this.total = total});
    }

  removeFromCart(vehicle: Vehicle): void {
    this.shoppingCartService.removeCartItem(vehicle);
    this.cartItems = this.shoppingCartService.getCartItems();
  }
  pay(): void {
    let summary = 'Résumé de la commande :\n';
    this.cartItems.forEach(item => {
      summary += `${item.brand} - ${item.model}: ${item.price}€\n`;
    });
    summary += `Total : ${this.cartItems.reduce((sum, item) => sum + item.price, 0)}€`;

    this.shoppingCartService.clearCart();
    this.cartItems = [];
    this.total = 0;
    
    this.notificationService.sendLongNotification(summary);
  }
}
