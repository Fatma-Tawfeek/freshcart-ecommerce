import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private __HttpClient: HttpClient) {}

  getProducts(currentPage: number = 1): Observable<any> {
    return this.__HttpClient.get(
      `${environment.baseUrl}/api/v1/products?page=${currentPage}`
    );
  }

  getProductDetails(id: string | null): Observable<any> {
    return this.__HttpClient.get(
      `${environment.baseUrl}/api/v1/products/${id}`
    );
  }
}
