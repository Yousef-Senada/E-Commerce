import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ShareVariabesService } from '../../services/share-variabes.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-cart-bar',
    standalone: false,

    templateUrl: './cart-bar.component.html',
    styleUrl: './cart-bar.component.css',
})
export class CartBarComponent implements OnInit {
    constructor(
        private _cartS: CartService,
        private _authS: AuthService,
        private sharedVS: ShareVariabesService,
        private _router: Router
    ) {}
    products = [];
    total: number = 0;
    isBarHidden: boolean = false;

    toggleBar() {
        this.sharedVS.toggleBar();
    }

    goToCart() {
        this._router.navigate(['/cart']);
        this.toggleBar();
    }

    ngOnInit(): void {
        this.sharedVS.isBarHidden$.subscribe((value) => {
            this.isBarHidden = value;
        });

        if (this._authS.isAuthenticated()) {
            this._cartS
                .getCartUser()
                .pipe(switchMap(() => this._cartS.cart$))
                .subscribe((data) => {
                    this.products = data.products;
                    this.total = data.total;
                });
        }
    }
}
