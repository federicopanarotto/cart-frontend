import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProductFilter } from '../../services/product.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { defaults } from 'lodash';

export function maxPriceValidator(minPriceControl: AbstractControl): ValidatorFn {
  return (maxPriceControl: AbstractControl): ValidationErrors | null => {
    if (minPriceControl && maxPriceControl) {
      const minPrice = minPriceControl.value;
      const maxPrice = maxPriceControl.value;

      if (maxPrice < minPrice) {
        return { maxPriceInvalid: true };
      }
    }
    return null;
  };
}

export type ProductFilterEvent = {
  name: string | null,
  minPrice: number | null,
  maxPrice: number | null
}

@Component({
  selector: 'app-product-filter',
  standalone: false,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  protected fb = inject(FormBuilder);

  protected destroyer$ = new Subject<void>();

  filtersForm = this.fb.group({
    name: new FormControl<string | null>(''),
    minPrice: new FormControl<number | null>(
      null, 
      {updateOn: 'submit', validators: [Validators.min(0)]}
    ),
    maxPrice: new FormControl<number | null>(
      null, 
      {updateOn: 'submit', validators: [Validators.min(0)]}
    )
  });

  @Input()
  set filters(value: Partial<ProductFilterEvent>) {
    const v = defaults({}, value, {name: null, minPrice: null, maxPrice: null});
    this.filtersForm.patchValue(v, {emitEvent: false});
    this.filtersForm.markAsPristine();
  }

  @Output()
  filterChange = new EventEmitter<ProductFilter>();

  ngOnInit() {
    // this.filters.get('maxPrice')?.setValidators([
    //   Validators.min(0),
    //   maxPriceValidator(this.filters.get('minPrice')!)
    // ]);

    this.filtersForm.valueChanges
      .pipe(
        filter(_ => this.filtersForm.valid),
        takeUntil(this.destroyer$)
      )
      .subscribe(filterValue => {
        this.filterChange.next(filterValue as ProductFilterEvent)
      });
  }

  ngOnDestroy(): void {
      this.destroyer$.next();
      this.destroyer$.complete();
  }

}