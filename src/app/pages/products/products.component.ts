import { Component, inject, OnInit } from '@angular/core';
import { ProductFilter, ProductService } from '../../services/product.service';
import { Product } from '../../services/product.entity';
import { VatService } from '../../services/vat.service';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CartSourceService } from '../../services/cart-source.service';
import { BehaviorSubject, catchError, combineLatest, debounceTime, filter, map, Observable, retry, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ProductFilterEvent } from '../../components/product-filter/product-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy, pick } from 'lodash';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  protected productSrv = inject(ProductService);
  protected vatSrv = inject(VatService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected refreshList$ = new Subject<void>();

  protected updateQueryParams = new Subject<ProductFilter>();
  protected destroyer$ = new Subject<void>();

  vat$ = this.vatSrv.vat$;

  filters$: Observable<ProductFilter> = this.activatedRoute.data
    .pipe(
      map(data => data['filters'])
    );

  products$ = combineLatest([
      this.filters$.pipe(startWith({})),
      this.refreshList$.pipe(startWith(''))
    ])
    .pipe(
      map(([filters, _]) => { return filters }),
      switchMap(filters => {
        return this.productSrv.list(filters)
          .pipe(
            catchError(err => {
              console.log(err);
              return [];
            })
          );
      })
    );
    
  ngOnInit() {
    this.vatSrv.setCountry('IT');

    this.updateQueryParams.pipe(
      takeUntil(this.destroyer$),
      debounceTime(300),
      map(filters => omitBy(filters, val => val === ''))
    ).subscribe((filters) => {
      this.router.navigate([], {queryParams: filters});
    }
    );
  }

  ngOnDestroy() {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  refresh() {
    this.refreshList$.next();
  }

  addToCart(productId: string, quantity: number) {
    // console.log(productId, quantity);
  }

  trackById(_: number, product: Product) {
    return product.id;
  }

  setFilters(filters: ProductFilter) {
    this.updateQueryParams.next(filters);
  }
}
