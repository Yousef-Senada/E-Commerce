import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
    BehaviorSubject,
    catchError,
    map,
    Observable,
    tap,
    throwError,
} from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private apiURL = `${environment.apiUrl}`;
    private endPoint = `cart`;
    private cartSubject = new BehaviorSubject<any>({ products: [], total: 0 });
    cart$ = this.cartSubject.asObservable();

    constructor(private _http: HttpClient, private _authS: AuthService) {}

    getCartUser(): Observable<any> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(() => new Error('User not authenticated'));
        }

        const headers = this._authS.getHeaders();
        return this._http
            .get(`${this.apiURL + this.endPoint}/user/${userId}`, { headers })
            .pipe(
                tap((data) => this.cartSubject.next(data)),
                catchError((error: any) => {
                    console.error('Error getting user cart', error);
                    return throwError(
                        () => new Error('Failed to get user cart')
                    );
                })
            );
    }

    countProcuctInCart(): Observable<number> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(
                () => new Error('User not authenticated or userId is missing')
            );
        }

        return this.cart$.pipe(
            map((userCart: any) => userCart.products.length),
            catchError((error: any) => {
                console.error('Error counting products in cart', error);
                return throwError(
                    () => new Error('Failed to count products in cart')
                );
            })
        );
    }

    isProductInCart(productId: string): Observable<boolean> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(
                () => new Error('User not authenticated or userId is missing')
            );
        }
        return this.cart$.pipe(
            map((userCart: any) => {
                let found = false;
                userCart.products.forEach((product: any) => {
                    if (product.product._id === productId) {
                        found = true;
                    }
                });
                return found;
            }),
            catchError((error: any) => {
                console.error('Error checking if product is in cart', error);
                return throwError(
                    () => new Error('Failed to check if product is in cart')
                );
            })
        );
    }

    addToCart(productId: string): Observable<any> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(
                () => new Error('User not authenticated or userId is missing')
            );
        }

        const data = { userId, productId, quantity: 1 };
        return this._http
            .post(`${this.apiURL + this.endPoint}/addProduct`, data, {
                headers: this._authS.getHeaders(),
            })
            .pipe(
                catchError((error: any) => {
                    console.error('Error adding to cart', error);
                    return throwError(
                        () => new Error('Failed to add product to cart')
                    );
                })
            );
    }

    decreasProduct(productId: string): Observable<any> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(
                () => new Error('User not authenticated or userId is missing')
            );
        }

        const data = { userId, productId, quantity: 1 };
        return this._http
            .post(`${this.apiURL + this.endPoint}/decreaseProduct`, data, {
                headers: this._authS.getHeaders(),
            })
            .pipe(
                catchError((error: any) => {
                    console.error('Error decrease from cart', error);
                    return throwError(
                        () => new Error('Failed to decrease product from cart')
                    );
                })
            );
    }

    deleteFromCart(productId: string): Observable<any> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(
                () => new Error('User not authenticated or userId is missing')
            );
        }

        const data = { userId, productId };
        return this._http
            .post(`${this.apiURL + this.endPoint}/deleteProduct`, data, {
                headers: this._authS.getHeaders(),
            })
            .pipe(
                catchError((error: any) => {
                    console.error('Error deleting product from cart', error);
                    return throwError(
                        () => new Error('Failed to delete product from cart')
                    );
                })
            );
    }
}
