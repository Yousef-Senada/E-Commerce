import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-cart',
    standalone: false,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
    subTotal: number = 0;
    deliveryCost: number = 50;
    title = 'Cart';
    loading: boolean = false;
    total: number = this.subTotal;
    products = [];
    constructor(
        private _cartS: CartService,
        private _authS: AuthService,
        private _route: Router
    ) {}

    ngOnInit(): void {
        if (this._authS.isAuthenticated()) {
            this.loading = true;
            this._cartS
                .getCartUser()
                .pipe(switchMap(() => this._cartS.cart$))
                .subscribe((data) => {
                    this.products = data.products;
                    this.subTotal = data.total;
                    this.total = this.subTotal + this.deliveryCost;
                    this.loading = false;
                });
        }
    }

    goToShop() {
        this._route.navigate(['/shop']);
    }
}
