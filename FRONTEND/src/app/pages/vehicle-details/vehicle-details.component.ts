import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../core/models/vehicle.model';
import { ShoppingCartService } from '../../core/services/shopping-cart.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})

export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle | null = null;

  notificationMessage: string = '';

  constructor(
    private vehicleService: VehicleService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    this.notificationService.currentNotification.subscribe(message => this.notificationMessage = message);
    if (vehicleId) {
      this.vehicleService.getVehicleById(+vehicleId).subscribe(
        (vehicles) => {
            this.vehicle = vehicles;
        },
        (error) => {
          console.error('Error fetching vehicle details', error);
        }
      );
    }
  }

  addToCart(): void {
    if (this.vehicle) {
      this.shoppingCartService.addCartItem(this.vehicle);
      this.notificationService.sendNotification('Le véhicule a été ajouté au panier');
    }
  }
}
