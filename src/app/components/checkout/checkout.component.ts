import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartId!: string | null;
  constructor(
    private __FormBuilder: FormBuilder,
    private __ActivatedRoute: ActivatedRoute,
    private __PaymentService: PaymentService,
    private __Router: Router
  ) {}
  checkoutForm: FormGroup = this.__FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [null, [Validators.required]],
    payment: [null, [Validators.required]],
  });

  payOrder(): void {
    if (this.checkoutForm.value.payment === 'cash') {
      this.__PaymentService
        .cashOrder(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            this.__Router.navigateByUrl('/allorders');
          },
          error: (err) => console.log(err),
        });
    } else {
      this.__PaymentService
        .checkoutSession(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            window.open(res.session.url, '_self');
          },
          error: (err) => console.log(err),
        });
    }
  }

  ngOnInit(): void {
    this.__ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('cart_id');
      },
    });
  }
}
