import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  loading: boolean = false;
  resText!: string;
  loginSub!: Subscription;
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
      this.loginSub = this.__AuthService
        .loginUser(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.resText = res.message;
            this.loading = false;
            sessionStorage.setItem('token', res.token);
            this.__AuthService.saveDecodedUser();

            setInterval(() => {
              this.__Router.navigate(['/home']);
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

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
