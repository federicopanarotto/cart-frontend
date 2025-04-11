import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, map, of, ReplaySubject, takeUntil, tap } from 'rxjs';
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
      map(_ => this.isLoggedIn()),
      distinctUntilChanged()
    );

  login(username: string, password: string) {
    return this.http.post<any>(`/api/login`, {username, password}).pipe(
      tap((res) => this.jwtSrv.setToken(res.token)),
      tap((res) => this._currentUser$.next(res.user)),
      map((res) => {
        console.log(res);
        return res.user
      })
    );
  }

  constructor() {
    this.fetchUser().subscribe();
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
  }

  fetchUser() {
    return this.http.get<User>(`/api/users/me`)
      .pipe(
        catchError(_ => {
          return of(null);
        }),
        tap(user => this._currentUser$.next(user))
      );
  }

  register(firstName: string, lastName: string, picture: string, username: string, password: string) {
    return this.http.post(`/api/register`, {firstName, lastName, picture, username, password})
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }
}
