import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartSourceService } from './services/cart-source.service';
import { VatService } from './services/vat.service';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { CartItem } from './services/cart-item.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);
  
  items$ = this.cartSrv.items$;
  vat$ = this.vatSrv.vat$;

  protected subscription: Subscription | null = null;
  protected destroyed$ = new Subject<void>();

  ngOnInit() {
    this.vatSrv.setCountry('IT');

    this.items$ = this.cartSrv.items$.pipe(
      tap(val => console.log(val))
    )
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    this.cartSrv.setQuantity(item.id, newQuantity);
  }

  trackById(_: number, item: CartItem) {
    return item.id;
  }
  
}