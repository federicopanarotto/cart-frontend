import { Component } from '@angular/core';
import { cart } from './utils/cart-data';
import { getVat } from './utils/cart-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  items = cart;

  vat = getVat('IT');

  updateQuantity(item: any, newQuantity: number) {
    const index = this.items.indexOf(item);
    const clone = structuredClone(this.items);
    clone[index].quantity = newQuantity;
    
    this.items = clone;
  }
  
}
