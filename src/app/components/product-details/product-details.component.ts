import { Component, Input } from '@angular/core';
import { Product } from '../../services/product.entity';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input()
  product!: Product;

  
}
