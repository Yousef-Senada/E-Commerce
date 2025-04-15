import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(private _http: HttpClient) {}
    private apiURL = `${environment.apiUrl}`;
    private endPoint = `user/register`;
    register(signupData: any): Observable<any> {
        return this._http
            .post<any>(this.apiURL + this.endPoint, signupData)
            .pipe(
                tap((res) => {
                    console.log(res);
                }),
                catchError((error) => {
                    console.error('Signup Error:', error);
                    return of(null);
                })
            );
    }
}
