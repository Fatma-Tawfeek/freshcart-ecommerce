import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private __HttpClient: HttpClient) {}

  registerUser(userData: object): Observable<any> {
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      userData
    );
  }

  loginUser(userData: object): Observable<any> {
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      userData
    );
  }
}
