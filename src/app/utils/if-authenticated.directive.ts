import { Directive, inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[ifAuthenticated]',
  standalone: false,
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  protected authSrv = inject(AuthService);
  protected viewContainer = inject(ViewContainerRef);
  protected templateRef = inject(TemplateRef)

  protected destroyer$ = new Subject<void>();

  private elseTemplateRef: TemplateRef<any> | null = null;

  @Input()
  set ifAuthenticatedElse(templateRef: TemplateRef<any> | null) {
    this.elseTemplateRef = templateRef;
  }

  ngOnInit(): void {
    this.authSrv.isAuthenticated$
      .pipe(
        takeUntil(this.destroyer$),
        distinctUntilChanged()
      )
      .subscribe(isAuthenticated => {
        this.viewContainer.clear();
        if (isAuthenticated) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (this.elseTemplateRef) {
          this.viewContainer.createEmbeddedView(this.elseTemplateRef);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

}