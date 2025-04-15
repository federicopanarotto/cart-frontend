import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, map, of, ReplaySubject, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from './entities/user.entity';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected http = inject(HttpClient);
  protected jwtSrv = inject(JwtService);
  protected router = inject(Router);

  protected _currentUser$ = new ReplaySubject<User | null>(1);
  currentUser$ = this._currentUser$.asObservable();

  isAuthenticated$ = this.currentUser$
    .pipe(
      map(user => !!user),
      distinctUntilChanged()
    );

  login(username: string, password: string) {
    return this.http.post<any>(`/api/login`, {username, password}).pipe(
      tap((res) => this.jwtSrv.setToken(res.token, res.refreshToken)),
      tap((res) => this._currentUser$.next(res.user)),
      map((res) => res.user)
    );
  }

  constructor() {
    this._currentUser$.next(this.jwtSrv.getPayload())
    console.log('auth');
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
  }

  fetchUser() {
    return this.http.get<User>(`/api/users/me`)
      .pipe(
        catchError(_ => {
          console.log(_)
          return of(null);
        }),
        tap(user => this._currentUser$.next(user)),
        tap(user => {console.log(user)}),
      );
  }

  register(firstName: string, lastName: string, picture: string, username: string, password: string) {
    return this.http.post(`/api/register`, {firstName, lastName, picture, username, password})
  }

  refreshTokens() {
    return this.http.post<{token: string, refreshToken: string}>('/api/refreshToken', {refreshToken: this.jwtSrv.getToken('authRefreshToken')})
      .pipe(
        tap(({token, refreshToken}) => {
          this.jwtSrv.setToken(token, refreshToken);
          this._currentUser$.next(this.jwtSrv.getPayload())
        })
      )
  }
}
