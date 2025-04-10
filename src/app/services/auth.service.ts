import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
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

  protected _currentUser$ = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser$.asObservable();

  login(username: string, password: string) {
    return this.http.post<any>(`/api/login`, {username, password}).pipe(
      tap((res) => this.jwtSrv.setToken(res.token)),
      tap((res) => this._currentUser$.next(res.user)),
      map((res) => {
        console.log(res);
        return res.user;
      })
    );
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/'])
  }

  register(firstName: string, lastName: string, picture: string, username: string, password: string) {
    return this.http.post(`/api/register`, {firstName, lastName, picture, username, password})
  }
}
