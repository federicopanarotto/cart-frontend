import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, map, Subject, takeUntil, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  protected fb = inject(FormBuilder);
  protected authSrv = inject(AuthService);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  
  protected destroyer$ = new Subject<void>()

  loginForm = this.fb.group({
    username: new FormControl<string | null>('', {validators: [Validators.required]}),
    password: new FormControl<string | null>('', {validators: [Validators.required]}),
  });

  loginError = '';

  requestedUrl: string | null = null;

  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(
        takeUntil(this.destroyer$)
      )
      .subscribe(() => {
        this.loginError = '';
      });

    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroyer$),
        map(params => params['requestedUrl'])
      )
      .subscribe(url => {
        this.requestedUrl = url;
      });
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }


  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authSrv.login(username!, password!)
        .pipe(
          catchError(response => {
            this.loginError = response.error.message;
            return throwError(() => response  );   
          })
        )
        .subscribe(() => {
          this.router.navigate([this.requestedUrl ? this.requestedUrl : '/']);
        });
    }
  }
}
