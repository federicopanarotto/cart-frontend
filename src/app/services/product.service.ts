import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './entities/product.entity';
import { isNil, omitBy } from 'lodash';

export type ProductFilter = {
  name?: string | null;
  minPrice?: number | null,
  maxPrice?: number | null
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected http = inject(HttpClient);

  list(filters: ProductFilter = {}) {
    const q: any = omitBy(filters, isNil);
    return this.http.get<Product[]>('/api/products', {params: q});
  }

  getProduct(productId: string | null) {
    return this.http.get<Product>(`api/products/${productId}`);
  }

}
