import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './Components/about/about.component';
import { CartBarComponent } from './Components/cart-bar/cart-bar.component';
import { ProductCartBarComponent } from './Components/cart-bar/product-cart-bar/product-cart-bar.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductCartPageComponent } from './Components/cart/product-cart-page/product-cart-page.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AddCategoryComponent } from './Components/dashboard/add-category/add-category.component';
import { AddProductComponent } from './Components/dashboard/add-product/add-product.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ErrorComponent } from './Components/error/error.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ForgetMyPasswordComponent } from './Components/forget-my-password/forget-my-password.component';
import { HeaderComponent } from './Components/header/header.component';
import { SearchBarComponent } from './Components/header/search-bar/search-bar.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AccountDetailsComponent } from './Components/my-account/account-details/account-details.component';
import { AddressesComponent } from './Components/my-account/addresses/addresses.component';
import { MyAccountComponent } from './Components/my-account/my-account.component';
import { OrdersComponent } from './Components/my-account/orders/orders.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SelectMenuComponent } from './Components/navbar/select-menu/select-menu.component';
import { PathDefineComponent } from './Components/path-define/path-define.component';
import { ProductComponent } from './Components/product/product.component';
import { RegisterComponent } from './Components/register/register.component';
import { ShopComponent } from './Components/shop/shop.component';
import { PriceFilterSliderComponent } from './Components/shop/sidebar-shop/price-filter-slider/price-filter-slider.component';
import { SidebarShopElementComponent } from './Components/shop/sidebar-shop/sidebar-shop-element/sidebar-shop-element.component';
import { SidebarShopComponent } from './Components/shop/sidebar-shop/sidebar-shop.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { ProductCardComponent } from './Components/shop/product-card/product-card.component';
import { LoadingPageComponent } from './Components/loading-page/loading-page.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { AlertComponent } from './Components/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './Components/message/message.component';
import { SidebarShopMobileComponent } from './Components/shop/sidebar-shop-mobile/sidebar-shop-mobile.component';
import { SidebarAccountComponent } from './Components/my-account/sidebar-account/sidebar-account.component';
import { SidebarAccountMobileComponent } from './Components/my-account/sidebar-account-mobile/sidebar-account-mobile.component';
import { AddImageToCarouselComponent } from './Components/dashboard/add-image-to-carousel/add-image-to-carousel.component';
import { CarouselComponent } from './Components/home/carousel/carousel.component';
import { FeaturedComponent } from './Components/home/featured/featured.component';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavbarComponent,
        FooterComponent,
        SearchBarComponent,
        SelectMenuComponent,
        HomeComponent,
        ShopComponent,
        AboutComponent,
        ContactComponent,
        LoginComponent,
        RegisterComponent,
        MyAccountComponent,
        ErrorComponent,
        ProductComponent,
        PathDefineComponent,
        DashboardComponent,
        CartComponent,
        WishListComponent,
        ForgetMyPasswordComponent,
        CartBarComponent,
        ProductCartBarComponent,
        ProductCardComponent,
        SidebarShopComponent,
        SidebarShopElementComponent,
        PriceFilterSliderComponent,
        AccountDetailsComponent,
        AddressesComponent,
        OrdersComponent,
        AddProductComponent,
        AddCategoryComponent,
        ProductCartPageComponent,
        LoadingPageComponent,
        SidebarComponent,
        AlertComponent,
        MessageComponent,
        SidebarShopMobileComponent,
        SidebarAccountComponent,
        SidebarAccountMobileComponent,
        AddImageToCarouselComponent,
        CarouselComponent,
        FeaturedComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
