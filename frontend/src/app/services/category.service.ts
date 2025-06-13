import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private _http: HttpClient, private _authS: AuthService) {}
    private apiURL = `${environment.apiUrl}`;
    private endPoint = `category`;
    private _selectedCategory = new BehaviorSubject<string>('');
    selectedCategory$ = this._selectedCategory.asObservable();

    setSelectedCategory(value: string) {
        this._selectedCategory.next(value);
    }

    getCategories(): Observable<any> {
        return this._http.get(this.apiURL + this.endPoint);
    }

    getActiveCategories(): Observable<any> {
        return this._http.get(`${this.apiURL + this.endPoint}/active`);
    }

    getCategoryById(id: string): Observable<any> {
        return this._http.get(`${this.apiURL + this.endPoint}/${id}`);
    }

    getCategoryByName(name: string): Observable<any> {
        return this._http.get(`${this.apiURL + this.endPoint}/${name}`);
    }

    addCategory(category: any): Observable<any> {
        const userId = this._authS.checkUserAuthentication();
        if (!userId) {
            return throwError(() => new Error('User not authenticated'));
        }

        if (!this._authS.isAdmin()) {
            return throwError(() => new Error('You are not Admin'));
        }

        return this._http
            .post(`${this.apiURL + this.endPoint}/add`, category, {
                headers: this._authS.getHeaders(),
            })
            .pipe(
                catchError((error: any) => {
                    console.error('Error adding Category', error);
                    return throwError(
                        () => new Error('Failed to add Category')
                    );
                })
            );
    }
}
