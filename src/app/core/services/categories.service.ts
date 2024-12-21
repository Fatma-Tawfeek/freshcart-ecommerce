import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly __HttpClient = inject(HttpClient);

  constructor() {}

  getAllCategories(): Observable<any> {
    return this.__HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
}
