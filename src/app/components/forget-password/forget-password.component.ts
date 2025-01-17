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
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  loading: boolean = false;
  forgetPasswordSub!: Subscription;
  constructor(
    private __FormBuildr: FormBuilder,
    private __AuthService: AuthService,
    private __Router: Router
  ) {}

  forgetPasswordForm: FormGroup = this.__FormBuildr.group({
    email: [null, [Validators.required, Validators.email]],
  });

  forgetPassword(): void {
    if (this.forgetPasswordForm.valid) {
      this.loading = true;
      this.forgetPasswordSub = this.__AuthService
        .forgetPassword(this.forgetPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.loading = false;
            console.log(res);
            setInterval(() => {
              this.__Router.navigate(['/reset-code']);
            }, 2000);
          },
          error: (err) => {
            this.loading = false;
          },
        });
    } else {
      this.forgetPasswordForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.forgetPasswordSub?.unsubscribe();
  }
}
