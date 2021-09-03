import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UserI } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private env: string;

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.env = environment.APP_URL;
  }

  registerUser(user: UserI): Observable<UserI> {
    return this._http.post<UserI>(`${ this.env }/api/auth/register`, user);
  }

  login(user: UserI): Observable<UserI> {
    return this._http.post<UserI>(`${ this.env }/api/auth/login`, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
