import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Product } from '../../services/product.entity';
import { combineLatest, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartSourceService } from '../../services/cart-source.service';
import { calcCartItem } from '../../utils/cart-utils';
import { VatService } from '../../services/vat.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  protected productSrv = inject(ProductService);
  protected cartSrv = inject(CartSourceService);
  protected activatedRoute = inject(ActivatedRoute);
  protected vatSrv = inject(VatService);

  vat$ = this.vatSrv.vat$;
  productData$: Observable<Product> = this.activatedRoute.params
    .pipe(
      switchMap(params => this.productSrv.getProduct(params['id']))
    );

  quantity = 1;
  
  data$ = combineLatest([
        this.productData$,
        this.vat$
      ]).pipe(
      map(([product, vat]) => {
        const productCalculated = calcCartItem({id: '', product: product, quantity: 1}, vat);
        return productCalculated;
      })
    );

  addToCart(productId: string, quantity: number) {
    this.cartSrv.addItem(productId, quantity);
  }
}
