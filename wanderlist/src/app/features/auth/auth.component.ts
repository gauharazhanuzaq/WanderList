import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent, RegisterComponent,CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-switcher">
        <button (click)="toggleForm('login')" [class.active]="isLoginMode">Login</button>
        <button (click)="toggleForm('register')" [class.active]="!isLoginMode">Register</button>
      </div>
      <app-login *ngIf="isLoginMode"></app-login>
      <app-register *ngIf="!isLoginMode"></app-register>
    </div>
  `,
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;

  toggleForm(mode: 'login' | 'register') {
    this.isLoginMode = mode === 'login';
  }
}

