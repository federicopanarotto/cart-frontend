import { ResolveFn } from '@angular/router';
import { ProductFilter } from '../services/product.service';
import { pick } from 'lodash';

export const productFiltersResolver: ResolveFn<ProductFilter> = (route, state) => {
  const params = route.queryParams;
  const filtered = pick(params, 'name', 'minPrice', 'maxPrice');
  return {
    ...params,
    minPrice: filtered.minPrice ? parseFloat(filtered.minPrice) : null,
    maxPrice: filtered.maxPrice ? parseFloat(filtered.maxPrice) : null
  }
};
