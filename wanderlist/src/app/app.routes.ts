import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(m => m.default),
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/auth.routes').then(m => m.default),
  },
  {
    path: 'places',
    loadChildren: () => import('./features/places/places.routes').then(m => m.default),
  },
  { path: 'auth', component: AuthComponent },
];
