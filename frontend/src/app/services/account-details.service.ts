import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AccountDetailsService {
    private apiURL = `${environment.apiUrl}`;
    private endPoint = `user`;

    constructor(private _authS: AuthService, private _http: HttpClient) {}

    getAccountDetails(): Observable<any> {
        if (this._authS.isAuthenticated()) {
            const userId = this._authS.checkUserAuthentication();
            const headers = this._authS.getHeaders();
            return this._http
                .get(`${this.apiURL + this.endPoint}/${userId}`, {
                    headers,
                })
                .pipe(
                    catchError((error) => {
                        console.error('Error fetching account details:', error);
                        return throwError(error);
                    })
                );
        } else {
            console.error('User is not logged in');
            return throwError({ error: 'User is not logged in' });
        }
    }

    updateAccountDetails(userDate: any): Observable<any> {
        const userId = this._authS.checkUserAuthentication();
        const headers = this._authS.getHeaders();
        if (this._authS.isAuthenticated()) {
            return this._http
                .post(
                    `${this.apiURL + this.endPoint}/update/${userId}`,
                    userDate,
                    {
                        headers,
                    }
                )
                .pipe(
                    catchError((error) => {
                        console.error(
                            'Failed to update account details:',
                            error
                        );
                        return throwError(
                            () =>
                                new Error(
                                    'Failed to update account details. Please try again later.'
                                )
                        );
                    })
                );
        } else {
            console.error('User is not logged in');
            return throwError({ error: 'User is not logged in' });
        }
    }
}
