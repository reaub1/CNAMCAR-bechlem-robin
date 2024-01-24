import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  term: string = '';
  searchControl = new FormControl('');

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
        this.filteredVehicles = vehicles;
      },
      (error) => {
        console.error('Error fetching vehicles', error);
      }
    );
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => this.filterVehicles(term as string))
    ).subscribe(filteredResults => {
      this.filteredVehicles = filteredResults;
    });
  }

  ngOnChanges(): void {
    this.filteredVehicles = this.term ? this.filterVehicles(this.term) : this.vehicles;
  }

  filterVehicles(searchString: string): Vehicle[] {
    return this.vehicles.filter(vehicle =>
      vehicle.brand.toLowerCase().includes(searchString.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}
