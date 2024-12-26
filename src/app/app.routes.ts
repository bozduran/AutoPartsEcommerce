import { Routes } from '@angular/router';
import {SubPartsMenuComponent} from './components/sub-parts-menu/sub-parts-menu.component';
import {SearchByCarBrandComponent} from './components/search-by-car-brand/search-by-car-brand.component';
import {SearchByCarModelComponent} from './components/search-by-car-model/search-by-car-model.component';
import {CarPartsComponent} from './components/car-parts/car-parts.component';
import {PartDetailsComponent} from './components/part-details/part-details.component';
import {CartDetailsComponent} from './components/cart-details/cart-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {OktaCallbackComponent} from '@okta/okta-angular';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path:'subPartsMenu',component:SubPartsMenuComponent},
  {path: '' , redirectTo: '/subPartsMenu',pathMatch:'full'},
  {path:'mainPartCategory/:id',component:SubPartsMenuComponent},
  {path:'searchByCarBrand',component:SearchByCarBrandComponent},
  {path:'carModel/:id',component:SearchByCarModelComponent},
  {path:'carModelParts/:id',component:CarPartsComponent},
  {path:'parts',component:CarPartsComponent},
  {path:'parts/:id',component:CarPartsComponent},
  {path:'partDetails/:id',component:PartDetailsComponent},
  {path:'cartDetails',component:CartDetailsComponent},
  {path:'checkout',component:CheckoutComponent},


  {path:'login/callback',component:OktaCallbackComponent},
  {path:'login',component:LoginComponent}
];
