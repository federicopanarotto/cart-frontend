import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected http = inject(HttpClient);

  constructor() { }

  list() {
    return this.http.get<Product[]>('/api/products');2
  }

}
