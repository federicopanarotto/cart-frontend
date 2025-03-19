import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountAmount',
  standalone: false
})
export class DiscountAmountPipe implements PipeTransform {

  constructor (private currency: CurrencyPipe) {}

  transform(value: string | number | null): string {
    if (value === 0) {
      return '';
    }
    const currencyString = this.currency.transform(value);
    return value ? `(-${currencyString})` : '';
  }
}