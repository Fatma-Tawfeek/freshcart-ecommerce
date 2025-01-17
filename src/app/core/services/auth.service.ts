import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private __HttpClient: HttpClient) {}

  decodedInfo!: any;

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

  saveDecodedUser(): void {
    if (sessionStorage.getItem('token') != null) {
      this.decodedInfo = jwtDecode(sessionStorage.getItem('token')!);
      console.log(this.decodedInfo);
    }
  }

  forgetPassword(userEmail: object): Observable<any> {
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      userEmail
    );
  }

  resetCode(resetCode: object): Observable<any> {
    return this.__HttpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      resetCode
    );
  }

  resetPassword(userData: object): Observable<any> {
    return this.__HttpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      userData
    );
  }
}
