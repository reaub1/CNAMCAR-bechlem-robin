import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageVehiclesComponent } from './manage-vehicles/manage-vehicles.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../core/interceptors/token.interceptor';

@NgModule({
  declarations: [
    HomeComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    ManageVehiclesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
})
export class PagesModule { }
