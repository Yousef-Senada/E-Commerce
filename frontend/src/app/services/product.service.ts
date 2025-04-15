import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private _http: HttpClient, private _authS: AuthService) {}
    private apiURL = `${environment.apiUrl}`;
    private endPoint = `product`;
    uploadURL = `https://res.cloudinary.com/dkxb9zmip/image/upload/`;
    private _selectedprice = new BehaviorSubject<{ min: number; max: number }>({
        min: 0,
        max: 0,
    });
    private _selectedRating = new BehaviorSubject<number>(0);
    selectedprice$ = this._selectedprice.asObservable();
    selectedRating$ = this._selectedRating.asObservable();

    setPriceRange(min: number, max: number) {
        this._selectedprice.next({ min: min, max: max });
    }

    setRating(rating: number) {
        this._selectedRating.next(rating);
    }

    getUploadURL(): string {
        return this.uploadURL;
    }

    getProducts(): Observable<any> {
        return this._http.get(this.apiURL + this.endPoint);
    }

    getActiveProducts(): Observable<any> {
        return this._http.get(`${this.apiURL + this.endPoint}/active`);
    }


    addProduct(product: FormData): Observable<any> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(() => new Error('User not authenticated'));
        }

        if (!this._authS.isAdmin()) {
            return throwError(() => new Error('You are not Admin'));
        }

        return this._http
            .post(`${this.apiURL + this.endPoint}/add`, product, {
                headers: this._authS.getHeaders(),
            })
            .pipe(
                catchError((error: any) => {
                    console.error('Error adding product', error);
                    return throwError(() => new Error('Failed to add product'));
                })
            );
    }

    getProductById(id: string): Observable<any> {
        return this._http.get(`${this.apiURL + this.endPoint}/${id}`);
    }
}
