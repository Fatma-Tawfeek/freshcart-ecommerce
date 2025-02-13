import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetCodeComponent } from './components/reset-code/reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersService } from './core/services/orders.service';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
      {
        path: 'reset-code',
        component: ResetCodeComponent,
        title: 'Reset code',
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      {
        path: 'productDetails/:p_id',
        component: ProductDetailsComponent,
        title: 'Product Details',
      },
      {
        path: 'wishlist',
        component: WhishlistComponent,
        title: 'Wishlist',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
      },
      {
        path: 'checkout/:cart_id',
        component: CheckoutComponent,
        title: 'Checkout',
      },
      {
        path: 'allorders',
        component: AllOrdersComponent,
        title: 'All Orders',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];
