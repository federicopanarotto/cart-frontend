import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';

import localeIt from '@angular/common/locales/it';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
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
import { logoutInterceptor } from './utils/logout.interceptor';
import { IfAuthenticatedDirective } from './utils/if-authenticated.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
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
    RegisterComponent,
    IfAuthenticatedDirective,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    { provide: LOCALE_ID, useValue: 'it-IT' },
    CurrencyPipe,
    provideHttpClient(
      withInterceptors([authInterceptor, logoutInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
