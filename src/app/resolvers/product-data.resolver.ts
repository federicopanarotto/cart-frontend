import { Params, ResolveFn } from '@angular/router';
import { Product } from '../services/product.entity';

export const productDataResolver: ResolveFn<Params> = (route, state) => {
  const params = route.params;

  return params;
};
