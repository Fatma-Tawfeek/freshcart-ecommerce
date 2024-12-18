import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private __AuthService: AuthService, private __Router: Router) {}
  loading: boolean = false;
  resText!: string;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,

        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );

  register() {
    if (this.registerForm.valid) {
      this.loading = true;
      console.log(this.registerForm);
      // call signup api
      this.__AuthService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          this.resText = res.message;
          this.loading = false;
          setInterval(() => {
            this.__Router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (err) => {
          this.resText = err.error.message;
          this.loading = false;
        },
        complete: () => {},
      });
    } else {
      this.registerForm.setErrors({ misMatch: true });
      this.registerForm.markAllAsTouched();
    }
  }

  // custom validator
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value !== g.get('rePassword')?.value) {
      return { misMatch: true };
    }
    return null;
  }
}
