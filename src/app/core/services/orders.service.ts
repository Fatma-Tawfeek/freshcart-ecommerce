import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private __HttpClient: HttpClient) {}

  decodedInfo!: any;
  saveDecodedUser(): void {
    if (sessionStorage.getItem('token') != null) {
      this.decodedInfo = jwtDecode(sessionStorage.getItem('token')!);
    }
  }

  getUserOrders(): Observable<any> {
    this.saveDecodedUser();
    return this.__HttpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${this.decodedInfo.id}`
    );
  }
}
