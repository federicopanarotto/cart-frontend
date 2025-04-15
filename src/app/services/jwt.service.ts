import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { User } from './entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  protected tokenStorageKey = 'authToken';
  protected refreshTokenStorageKey = 'authRefreshToken';

  hasToken() {
    return !!this.getToken(this.tokenStorageKey);
  }

  hasRefreshToken() {
    return !!this.getToken(this.refreshTokenStorageKey);
  }

  getToken(tokenKey: string) {
    return localStorage.getItem(tokenKey);
  }

  setToken(token: string, refreshToken: string) {
    localStorage.setItem(this.tokenStorageKey, token);
    localStorage.setItem(this.refreshTokenStorageKey, refreshToken)
  }

  removeToken() {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.refreshTokenStorageKey);
  }

  getPayload() {
    const token = this.getToken(this.tokenStorageKey);
    return !!token ? jwtDecode<User>(token) : null;
  }
}
