import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartSourceService } from '../../services/cart-source.service';
import { CartItem } from '../../services/entities/cart-item.entity';
import { VatService } from '../../services/vat.service';
import { combineLatest, debounceTime, map, Subject, takeUntil } from 'rxjs';
import { calcCartItem } from '../../utils/cart-utils';

@Component({
  selector: 'app-side-cart',
  standalone: false,
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css'
})
export class SideCartComponent implements OnInit, OnDestroy {
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatService);

  protected updateQtySubject$ = new Subject<{ id: string, quantity: number }>();
  protected destroyed$ = new Subject<void>();

  items$ = this.cartSrv.items$;
  vat$ = this.vatSrv.vat$;

  total$ = combineLatest([
    this.items$,
    this.vat$
  ])
  .pipe(
    map(([items, vat]) => {
      const itemsCalculated = items.map(item => {
        return calcCartItem(item, vat);
      });

      const summary = itemsCalculated.reduce((summ, item) => {
        const calculatedCart = calcCartItem(item, vat);
        return {
          netTotal: summ.netTotal + calculatedCart.netTotalPrice,
          totalVat: summ.totalVat + calculatedCart.vatPrice,
          totalWeight: summ.totalWeight + calculatedCart.totalWeight,
          totalPrice: summ.totalPrice + calculatedCart.totalPrice
        }
      }, { netTotal: 0, totalVat: 0, totalWeight: 0, totalPrice: 0 });
      return summary.totalPrice;
    })
  );

  trackById(_: number, item: CartItem) {
    return item.id;
  }

  ngOnInit(): void {
    this.updateQtySubject$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(300)
      )
      .subscribe(({ id, quantity }) => {
        this.cartSrv.setQuantity(id, quantity);
      });
  }

  getItemPrice(item: CartItem, vat: number) {
    const calculated = calcCartItem(item, vat);
    return calculated.totalPrice;
  }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    this.updateQtySubject$.next({ id: item.id, quantity: newQuantity });
  }

  remove(id: string) {
    this.cartSrv.removeItem(id);
  }
}
