import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  protected fb = inject(FormBuilder);

  registerForm = this.fb.group({
    firstName: new FormControl<string | null>('', {validators: [Validators.required]}),
    lastName: new FormControl<string | null>('', {validators: [Validators.required]}),
    picture: new FormControl<string | null>('', {validators: [Validators.required]}),
    username: new FormControl<string | null>('', {validators: [Validators.required]}),
    password: new FormControl<string | null>('', {validators: [Validators.required]}),
  });

  registerError = '';
  
  protected destroyer$ = new Subject<void>();

  ngOnInit(): void {
    this.registerForm.valueChanges
      .pipe(
        takeUntil(this.destroyer$)
      )
      .subscribe(() => {
        this.registerError = '';
      })
  }

  ngOnDestroy(): void {
    this.destroyer$.next;
    this.destroyer$.complete();
  }

  register() {
    if (this.registerForm.valid) {
      const { firstName, lastName, picture, username, password } = this.registerForm.value;

      console.log(this.registerForm.value);
    }
  }


}
