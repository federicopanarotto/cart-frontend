import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { Product } from '../services/entities/product.entity';
import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { catchError, of } from 'rxjs';

export const productDataResolver: ResolveFn<Product> = (route, state) => {
  const productSrv = inject(ProductService);
  const id = route.paramMap.get('id');

  return productSrv.getProduct(id).pipe(
    catchError(_ => {
      return of(new RedirectCommand(inject(Router).parseUrl('products')));
    })
  );
};
