import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  loading: boolean = false;
  resText!: string;
  resetPasswordSub!: Subscription;
  constructor(
    private __FormBuildr: FormBuilder,
    private __AuthService: AuthService,
    private __Router: Router
  ) {}

  resetPasswordForm: FormGroup = this.__FormBuildr.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.loading = true;
      this.resetPasswordSub = this.__AuthService
        .resetPassword(this.resetPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.loading = false;
            sessionStorage.setItem('token', res.token);
            this.__AuthService.saveDecodedUser();
            setInterval(() => {
              this.__Router.navigate(['/auth/login']);
            }, 2000);
          },
          error: (err) => {
            this.resText = err.error.message;
            this.loading = false;
          },
        });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.resetPasswordSub?.unsubscribe();
  }
}
