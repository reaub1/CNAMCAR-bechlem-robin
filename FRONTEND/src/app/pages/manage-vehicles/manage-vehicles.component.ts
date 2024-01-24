import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.css']
})
export class ManageVehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) { }
  
  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(
      (res) => {
        this.vehicles = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  deleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
