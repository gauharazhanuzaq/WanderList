import { Routes } from '@angular/router';
import { PlacesComponent } from './places.component';
import { authGuard } from '../../core/guards/auth.guard';

export default [
  {
    path: '',
    component: PlacesComponent,
    canActivate: [authGuard]
  }
] as Routes;
