import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:8080/login";
  private _token: string | undefined;
  private _user: any = {
    isAuth: false,
    isAdmin: false,
    user: undefined
  };

  constructor(private http: HttpClient) { }

  set user(user: any) {
    this._user = user;
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem('login', JSON.stringify(user));
    }
  }

  get user() {
    if (this._user.isAuth) {
      return this._user;
    } else if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem('login') != null) {
      this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
      return this._user;
    }
    return this._user;
  }

  set token(token: string) {
    this._token = token;
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem('token', token);
    }
  }

  get token() {
    if (this._token != undefined) {
      return this._token;
    } else if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token!;
  }

  getPayload(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  isAuth() {
    return this.user.isAuth;
  }

  getUserEmail(): string | null {
    return this.user.user ? this.user.user.email : null;
  }

  loginUser({ email, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { email, password });
  }

  logout() {
    this._token = undefined;
    this._user = {
      isAuth: false,
      isAdmin: false,
      user: undefined
    };
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('token');
    }
  }
}
