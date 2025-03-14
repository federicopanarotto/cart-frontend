import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { calcCartItem, getTransportFee } from '../../utils/cart-utils';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {
  @Input({required: true})
  items: any[] = [];
  @Input()
  vat: number = 0;

  summary = this.getSummary();

  ngOnChanges(): void {
    this.summary = this.getSummary();
  }

  getSummary() {
    const summary = this.items.reduce((summ, item) => {
      const calculatedCart = calcCartItem(item, this.vat);
      return {
        netTotal: summ.netTotal + calculatedCart.netTotalPrice, 
        totalVat: summ.totalVat + calculatedCart.vatPrice,
        totalWeight: summ.totalWeight + calculatedCart.totalWeight,
        totalPrice: summ.totalPrice + calculatedCart.totalPrice
      }
    }, {netTotal: 0, totalVat: 0, totalWeight: 0, totalPrice: 0}); 

    const transportFee = getTransportFee(summary.totalWeight);

    return {
      ...summary,
      transportFee
    }
  }


}
