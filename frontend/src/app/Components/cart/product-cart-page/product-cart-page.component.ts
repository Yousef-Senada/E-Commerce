import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-product-cart-page',
    standalone: false,

    templateUrl: './product-cart-page.component.html',
    styleUrl: './product-cart-page.component.css',
})
export class ProductCartPageComponent implements OnInit {
    imgMainURl = '';
    loading: boolean = false;
    @Input() product: any;
    constructor(
        private _productS: ProductService,
        private _cartS: CartService,
        private _auth: AuthService
    ) {}
    ngOnInit(): void {
        this.imgMainURl = this._productS.getUploadURL();
    }

    increaseProduct(): void {
        if (this._auth.isAuthenticated()) {
            this.loading = true;
            this.product.quantity++;
            this._cartS.addToCart(this.product.product._id).subscribe(() => {
                setTimeout(() => {
                    this._cartS
                        .getCartUser()
                        .subscribe(() => (this.loading = false));
                }, 1000);
            });
        }
    }

    decreaseProduct(): void {
        if (this._auth.isAuthenticated()) {
            this.loading = true;
            if (this.product.quantity > 1) {
                this.product.quantity--;
                this._cartS
                    .decreasProduct(this.product.product._id)
                    .subscribe(() => {
                        setTimeout(() => {
                            this._cartS.getCartUser().subscribe(() => {
                                this.loading = false;
                            });
                        }, 1000);
                    });
            } else {
                this._cartS
                    .deleteFromCart(this.product.product._id)
                    .subscribe(() => {
                        setTimeout(() => {
                            this._cartS.getCartUser().subscribe(() => {
                                this.loading = false;
                            });
                        }, 1000);
                    });
            }
        }
    }

    deleteProduct() {
        if (this._auth.isAuthenticated()) {
            this.loading = true;
            this._cartS
                .deleteFromCart(this.product.product._id)
                .pipe(switchMap(() => this._cartS.getCartUser()))
                .subscribe({
                    next: () => (this.loading = false),
                    error: () => (this.loading = false),
                });
        }
    }
}
