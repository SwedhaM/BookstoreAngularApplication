import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { FilteredPageComponent } from './filtered-page/filtered-page.component';
import { AuthComponent } from './auth/auth.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {
    component:HomeComponent,
    path:'',
  },
  {
    component:OrderHistoryComponent,
    path:'order-history',
  },
  {
    component:SellerHomeComponent,
    path:'seller-home',
    canActivate:[AuthGuard]
  },
  {
    component:SellerAddProductComponent,
    path:'seller-add-product',
    canActivate:[AuthGuard]
  },
  {
    component:SellerUpdateProductComponent,
    path:'seller-update-product/:id',
    canActivate:[AuthGuard]
  },
  {
    component:SearchComponent,
    path:'search/:query'
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {
    component:CartPageComponent,
    path:'cart-page'
  },
  {
    component:CheckoutComponent,
    path:'checkout'
  },
  {
    component:AllProductsComponent,
    path:'all-products'
  },
  {
    component:FilteredPageComponent,
    path:'filtered-page'
  },
  {
    component:MyOrdersComponent,
    path:'my-orders'
  },
  {
    component:AuthComponent,
    path:'auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
