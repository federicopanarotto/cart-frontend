import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { productFiltersResolver } from './resolvers/product-filters.resolver';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { productDataResolver } from './resolvers/product-data.resolver';
import { ProductContainerComponent } from './pages/product-container/product-container.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
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
