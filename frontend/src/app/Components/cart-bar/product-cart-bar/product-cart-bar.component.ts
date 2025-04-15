import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-product-cart-bar',
    standalone: false,

    templateUrl: './product-cart-bar.component.html',
    styleUrl: './product-cart-bar.component.css',
})
export class ProductCartBarComponent implements OnInit {
    @Input() product: any;
    @Output() productDeleted: EventEmitter<void> = new EventEmitter();
    isDelete = false;
    loading = false;
    constructor(
        private _productS: ProductService,
        private _cartS: CartService
    ) {}
    imgMainURl: string = '';
    ngOnInit(): void {
        this.imgMainURl = this._productS.uploadURL;
    }

    deleteFromCart(): void {
        this.loading = true;
        this._cartS
            .deleteFromCart(this.product.product._id)
            .pipe(switchMap(() => this._cartS.getCartUser()))
            .subscribe({
                next: () => {
                    this.loading = false;
                    this.isDelete = true;
                },
                error: () => (this.loading = false),
            });
    }
}
