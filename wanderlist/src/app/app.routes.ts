import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailsComponent } from './places/place-details/place-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'places/:id', component: PlaceDetailsComponent },
];
