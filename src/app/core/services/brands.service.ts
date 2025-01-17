import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private __HttpClient: HttpClient) {}

  getAllBrands(currentPage: number = 1): Observable<any> {
    return this.__HttpClient.get(
      `${environment.baseUrl}/api/v1/brands?page=${currentPage}`
    );
  }
}
