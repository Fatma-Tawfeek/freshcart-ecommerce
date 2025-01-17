import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private __HttpClient: HttpClient) {}

  cashOrder(cartId: string | null, shippingData: object): Observable<any> {
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: shippingData,
      }
    );
  }

  checkoutSession(
    cartId: string | null,
    shippingData: object
  ): Observable<any> {
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,
      {
        shippingAddress: shippingData,
      }
    );
  }
}
