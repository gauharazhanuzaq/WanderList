import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { 'mismatch': true } : null;
  }

  success = '';

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  
    this.loading = true;
    this.error = '';
    this.success = '';
  
    const { username, password } = this.registerForm.value;
  
    this.authService.register({ username, password }).subscribe(
      (response) => {
        this.success = 'Registration successful';
        this.loading = false;
      },
      (error) => {
        this.error = 'Registration failed. Please try again.';
        this.loading = false;
      }
    );
  }
  
}
