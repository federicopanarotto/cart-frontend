import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { productFiltersResolver } from './resolvers/product-filters.resolver';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { productDataResolver } from './resolvers/product-data.resolver';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { 
    path: 'products', 
    component: ProductsComponent,
    resolve: {
      filters: productFiltersResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'products/details/:id',
    component: ProductDetailsComponent,
    // resolve: {
    //   id: productDataResolver
    // },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
