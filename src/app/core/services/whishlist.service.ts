import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhishlistService {
  clientToken: any = { token: sessionStorage.getItem('token') };
  constructor(private __HttpClient: HttpClient) {}

  getWishlist(): Observable<any> {
    return this.__HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`, {
      headers: this.clientToken,
    });
  }

  addItemToWishlist(p_id: string): Observable<any> {
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/wishlist`,
      { productId: p_id },
      {
        headers: this.clientToken,
      }
    );
  }

  removeItemFromWishlist(p_id: string): Observable<any> {
    return this.__HttpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${p_id}`,
      {
        headers: this.clientToken,
      }
    );
  }
}
