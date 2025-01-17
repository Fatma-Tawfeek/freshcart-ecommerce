import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { count } from 'console';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly __HttpClient = inject(HttpClient);

  cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  getLoggedUserCart(): Observable<any> {
    return this.__HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  addItemToCart(p_id: string): Observable<any> {
    // url - body - headers
    return this.__HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: p_id,
    });
  }

  removeItemFromCart(p_id: string): Observable<any> {
    return this.__HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${p_id}`
    );
  }

  updateItemQuantity(p_id: string, count: number): Observable<any> {
    return this.__HttpClient.put(`${environment.baseUrl}/api/v1/cart/${p_id}`, {
      count: count,
    });
  }

  clearAllCart(): Observable<any> {
    return this.__HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
