import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../services/product.entity';
import { getDiscountPrice, getVatPrice } from '../../utils/cart-utils';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnChanges {
  @Input({required: true})
  product!: Product;
  @Input({required: true})
  vat: number = 0;

  @Output('addItem')
  onAddItem = new EventEmitter<{productId: string, quantity: number}>();
  @Output('clickDetails')
  onClickDetails = new EventEmitter<any>();

  quantity: number = 1;

  price: number = 0;
  discount: number = 0;

  ngOnChanges(): void {
    const p = getVatPrice(this.product.netPrice, this.vat);
    this.price = this.product.netPrice - getDiscountPrice(this.product.netPrice, this.product.discount);
    this.discount = p  * this.product.discount
  }

  addItem() {
    this.onAddItem.emit({productId: this.product.id, quantity: this.quantity});
    this.quantity = 1;
  }
}
