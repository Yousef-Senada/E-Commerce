import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { loginedGuard } from './guards/logined.guard';
import { AboutComponent } from './Components/about/about.component';
import { CartComponent } from './Components/cart/cart.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddCategoryComponent } from './Components/dashboard/add-category/add-category.component';
import { AddProductComponent } from './Components/dashboard/add-product/add-product.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { WelcomeComponent } from './Components/dashboard/welcome/welcome.component';
import { ErrorComponent } from './Components/error/error.component';
import { ForgetMyPasswordComponent } from './Components/forget-my-password/forget-my-password.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AccountDetailsComponent } from './Components/my-account/account-details/account-details.component';
import { MyAccountComponent } from './Components/my-account/my-account.component';
import { ProductComponent } from './Components/product/product.component';
import { RegisterComponent } from './Components/register/register.component';
import { ShopComponent } from './Components/shop/shop.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { AddImageToCarouselComponent } from './Components/dashboard/add-image-to-carousel/add-image-to-carousel.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },

    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginedGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard, adminGuard],
        children: [
            { path: 'add-product', component: AddProductComponent },
            { path: 'add-category', component: AddCategoryComponent },
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'add-image-to-carousel',
                component: AddImageToCarouselComponent,
            },
            { path: '', redirectTo: 'add-product', pathMatch: 'full' },
        ],
    },
    {
        path: 'my-account',
        component: MyAccountComponent,
        canActivate: [authGuard],
        children: [
            { path: 'account-details', component: AccountDetailsComponent },
            { path: '', redirectTo: 'account-details', pathMatch: 'full' },
        ],
    },
    {
        path: 'wish-list',
        component: WishListComponent,
        canActivate: [authGuard],
    },
    {
        path: 'forget-my-password',
        component: ForgetMyPasswordComponent,
    },
    { path: '**', component: ErrorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
