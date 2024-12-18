import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading: boolean = false;
  resText!: string;
  constructor(
    private __FormBuildr: FormBuilder,
    private __AuthService: AuthService,
    private __Router: Router
  ) {}

  loginForm: FormGroup = this.__FormBuildr.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginUser(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm);
      this.__AuthService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          this.resText = res.message;
          this.loading = false;
          sessionStorage.setItem('token', res.token);
          setInterval(() => {
            this.__Router.navigate(['/main/home']);
          }, 2000);
        },
        error: (err) => {
          this.resText = err.error.message;
          this.loading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
