import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.entity';
import { VatService } from '../../services/vat.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CartSourceService } from '../../services/cart-source.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  protected productSrv = inject(ProductService);
  protected vatSrv = inject(VatService);
  protected fb = inject(FormBuilder);
  protected cartSourceSrv = inject(CartSourceService);

  products$ = this.productSrv.list();
  vat$ = this.vatSrv.vat$;

  filters = this.fb.group({
    name: '',
    minPrice: [null, {updateOn: 'submit', validators: [Validators.min(0)]}],
    maxPrice: [null, {updateOn: 'submit'}]
  });

  ngOnInit() {
    this.vatSrv.setCountry('IT');

    this.filters.valueChanges.subscribe(f => {
      console.log(f);
    });
  }

  addToCart(productId: string, quantity: number) {
    console.log(productId, quantity);
  }

  trackById(_: number, product: Product) {
    return product.id;
  }
}
