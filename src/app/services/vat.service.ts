import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VatService {
  protected _vat$ = new BehaviorSubject<number>(0);

  vat$ = this._vat$.asObservable();

  setCountry(countryCode: string) {
    this._vat$.next(countryCode === "IT" ? 0.22 : 0);
  }

}
