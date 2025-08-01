import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { productFiltersResolver } from './resolvers/product-filters.resolver';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { productDataResolver } from './resolvers/product-data.resolver';
import { ProductContainerComponent } from './pages/product-container/product-container.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  {
    path: 'products',
    component: ProductContainerComponent,
    children: [
      { 
        path: '', 
        component: ProductsComponent,
        resolve: {
          filters: productFiltersResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      {
        path: ':id',
        component: ProductDetailsComponent,
        resolve: {
          data: productDataResolver
        },
      },
    ]
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
