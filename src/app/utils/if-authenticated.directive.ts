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
  private hasView = false;

  @Input('ifAuthenticatedElse')
  set ifAuthenticatedElse(templateRef: TemplateRef<any> | null) {
    this.elseTemplateRef = templateRef;
  }

  ngOnInit(): void {
    this.authSrv.isAuthenticated$
      .pipe(
        takeUntil(this.destroyer$)
      )
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (this.elseTemplateRef) {
          this.viewContainer.createEmbeddedView(this.elseTemplateRef);
          this.hasView = true;
        } else {
          this.hasView = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

}
