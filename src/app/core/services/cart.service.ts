import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { count } from 'console';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly __HttpClient = inject(HttpClient);

  clientToken: any = { token: sessionStorage.getItem('token') };

  constructor() {}

  getLoggedUserCart(): Observable<any> {
    return this.__HttpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.clientToken,
    });
  }

  addItemToCart(p_id: string): Observable<any> {
    // url - body - headers
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      { productId: p_id },
      {
        headers: this.clientToken,
      }
    );
  }

  removeItemFromCart(p_id: string): Observable<any> {
    return this.__HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${p_id}`,
      {
        headers: this.clientToken,
      }
    );
  }

  updateItemQuantity(p_id: string, count: number): Observable<any> {
    return this.__HttpClient.put(
      `${environment.baseUrl}/api/v1/cart/${p_id}`,
      { count: count },
      {
        headers: this.clientToken,
      }
    );
  }

  clearAllCart(): Observable<any> {
    return this.__HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.clientToken,
    });
  }
}
