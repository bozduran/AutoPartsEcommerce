import { Routes } from '@angular/router';
import {SubPartsMenuComponent} from './components/sub-parts-menu/sub-parts-menu.component';
import {SearchByCarBrandComponent} from './components/search-by-car-brand/search-by-car-brand.component';
import {SearchByCarModelComponent} from './components/search-by-car-model/search-by-car-model.component';
import {CarPartsComponent} from './components/car-parts/car-parts.component';
import {PartDetailsComponent} from './components/part-details/part-details.component';

export const routes: Routes = [
  {path:'subPartsMenu',component:SubPartsMenuComponent},
  {path: '' , redirectTo: '/subPartsMenu',pathMatch:'full'},
  {path:'mainPartCategory/:id',component:SubPartsMenuComponent},
  {path:'searchByCarBrand',component:SearchByCarBrandComponent},
  {path:'carModel/:id',component:SearchByCarModelComponent},
  {path:'carModelParts/:id',component:CarPartsComponent},
  {path:'parts',component:CarPartsComponent},
  {path:'carPart/:id',component:PartDetailsComponent}
];


// const routes:Routes=[
//   {path: 'checkout' , component: CheckoutComponent},
//   {path: 'cart-details' , component: CartDetailsComponent},
//   {path: 'products/:id' , component: ProductDetailsComponent},
//   {path: 'search/:keyword' , component: ProductListComponent},
//   {path: 'category/:id' , component: ProductListComponent},
//   {path: 'category' , component: ProductListComponent},
//   {path: 'products' , component: ProductListComponent},
//   {path: '' , redirectTo: '/products',pathMatch:'full'},
//   {path: 'category/:id' ,redirectTo: '/products',pathMatch:'full'}
// ]
