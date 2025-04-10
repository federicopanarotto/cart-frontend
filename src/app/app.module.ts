import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';

import localeIt from '@angular/common/locales/it';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { SideCartComponent } from './components/side-cart/side-cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductContainerComponent } from './pages/product-container/product-container.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authInterceptor } from './utils/auth.interceptor';
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    CartItemComponent,
    SummaryComponent,
    DiscountAmountPipe,
    CheckoutComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductFilterComponent,
    SideCartComponent,
    ProductDetailsComponent,
    ProductContainerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    { provide: LOCALE_ID, useValue: 'it-IT' },
    CurrencyPipe,
    provideHttpClient(
      withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
