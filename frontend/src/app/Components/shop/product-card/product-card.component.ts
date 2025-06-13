import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { switchMap } from 'rxjs';
import { ShareVariabesService } from '../../../services/share-variabes.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-product-card',
    standalone: false,

    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
    constructor(
        private _cartS: CartService,
        private _productS: ProductService,
        private _auth: AuthService,
        private _shareVR: ShareVariabesService,
        private _router: Router
    ) {}
    @Input() product: any;
    isHoverProduct: boolean = false;
    isAddToCart: boolean = false;
    imgMainURl: string = '';
    loading: boolean = false;

    ngOnInit(): void {
        this.imgMainURl = this._productS.uploadURL;
        if (this._auth.isAuthenticated()) {
            this.loading = true;
            this._cartS
                .isProductInCart(this.product._id)
                .subscribe((isInCart) => {
                    this.isAddToCart = isInCart;
                    this.loading = false;
                });
        } else {
            this.isAddToCart = false;
            this.loading = false;
        }
        console.log(this.product);
    }

    goProductPage() {
        this._router.navigate(['/product', this.product._id]);
    }

    addToCart(): void {
        if (this._auth.isAuthenticated()) {
            this.loading = true;
            this.isAddToCart = true;
            this._cartS
                .addToCart(this.product._id)
                .pipe(switchMap(() => this._cartS.getCartUser()))
                .subscribe({
                    next: () => (
                        (this.loading = false),
                        this._shareVR.setBarHidden(false)
                    ),
                    error: () => {
                        console.log('error');
                    },
                });
        } else {
            this.loading = false;
            this._router.navigate(['./login']);
        }
    }

    onMouseHoverProduct() {
        this.isHoverProduct = true;
    }

    onMouseLeaveProduct() {
        this.isHoverProduct = false;
    }
}
