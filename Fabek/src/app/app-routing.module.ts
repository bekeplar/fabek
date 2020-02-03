import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ShippingTermsComponent } from './shipping-terms/shipping-terms.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shipping-terms', component: ShippingTermsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
