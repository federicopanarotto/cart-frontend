import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../services/entities/product.entity';
import { calcCartItem, getDiscountPrice, getVatPrice } from '../../utils/cart-utils';

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

  @Output('openDetails')
  onOpenDetails = new EventEmitter<string>();

  quantity: number = 1;

  price: number = 0;
  discount: number = 0;

  ngOnChanges(): void {
    const calcs = calcCartItem({id: '', product: this.product, quantity: 1}, this.vat);
    this.price = calcs.totalPrice;
    this.discount = calcs.discountPrice
  }

  addItem() {
    this.onAddItem.emit({productId: this.product.id, quantity: this.quantity});
    this.quantity = 1;
  }

}
