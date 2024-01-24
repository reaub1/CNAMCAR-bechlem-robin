import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItemsSource = new BehaviorSubject<Vehicle[]>([]);
  currentCartItems = this.cartItemsSource.asObservable();
  private cartItemCount = new BehaviorSubject<number>(0);
  private totalPrice = new BehaviorSubject<number>(0);
  totalCartPrice = this.totalPrice.asObservable();

  constructor() { }

  getCartItems(): Vehicle[] {
    return this.cartItemsSource.value;
  }

  addCartItem(vehicle: Vehicle): void {
    const currentItems = this.cartItemsSource.value;
    if (!currentItems.some(item => item.id === vehicle.id)) {
      this.cartItemsSource.next([...currentItems, vehicle]);
      this.cartItemCount.next(this.cartItemCount.value + 1);
      this.totalPrice.next(this.totalPrice.value + vehicle.price);
    }
  }

  removeCartItem(vehicle: Vehicle): void {
    const updatedItems = this.cartItemsSource.value.filter(item => item.id !== vehicle.id);
    this.cartItemsSource.next(updatedItems);
    this.cartItemCount.next(updatedItems.length);
    this.totalPrice.next(this.totalPrice.value - vehicle.price);
  }

  updateCartItemCount(count: number): void {
    this.cartItemCount.next(count);
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  getTotalCartPrice(): Observable<number> {
    return this.totalPrice.asObservable();
  }

  clearCart(): void {
    this.cartItemsSource.next([]);
    this.totalPrice.next(0);
    this.cartItemCount.next(0);
  }
}
