import { Component, EventEmitter, Input, Output } from '@angular/core';
import { calcCartItem } from '../../utils/cart-utils';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input({required: true})
  item: any;
  @Input()
  vat: number = 0;

  @Output('quantityChange')
  onQuantityChange = new EventEmitter<number>();

  getItemPrice(item: any) {
    const calculated = calcCartItem(item, this.vat);
    return calculated.totalPrice;
  }

  getDiscountAmount(item: any) {
    const calculated = calcCartItem(item, this.vat);
    return calculated.discountPrice;
  }

  quantityChange(value: number) {
    this.onQuantityChange.emit(value);
  }
}
