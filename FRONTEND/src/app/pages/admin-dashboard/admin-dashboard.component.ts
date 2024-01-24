import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../core/models/vehicle.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  vehicles: Vehicle[] = [];
  users: User[] = [];

  constructor(
    private vehicleService: VehicleService,
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
      },
      (error) => {
        console.error('Error fetching vehicles', error);
      }
    );
  }
}
