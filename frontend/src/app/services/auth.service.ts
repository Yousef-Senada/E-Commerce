import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiURL = `${environment.apiUrl}`;
    private endPoint = `user`;
    private tokenSubject = new BehaviorSubject<string | null>(null);
    constructor(private _http: HttpClient) {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            this.tokenSubject.next(storedToken);
        }
    }

    isAuthenticated(): boolean {
        return this.tokenSubject.value !== null;
    }

    isAdmin(): boolean {
        const decodedToken = this.decodedAccessToken();
        if (decodedToken) {
            if (decodedToken.userType === 'admin') {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    login(loginData: any): Observable<any> {
        return this._http
            .post<any>(`${this.apiURL + this.endPoint}/login`, loginData)
            .pipe(
                tap((res) => {
                    if (res.accessToken) {
                        this.tokenSubject.next(res.accessToken);
                        localStorage.setItem('accessToken', res.accessToken);
                        setTimeout(() => {
                            window.location.reload();
                        }, 800);
                    }
                })
            );
    }

    getAccessToken(): Observable<string | null> {
        return this.tokenSubject.asObservable();
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        this.tokenSubject.next(null);
        window.location.reload();
    }

    checkUserAuthentication(): string | null {
        const user = this.decodedAccessToken();
        if (!user || !user.userId) {
            return null;
        }
        return user.userId;
    }

    decodedAccessToken(): any {
        const token = this.tokenSubject.value;
        if (token) {
            return jwtDecode<any>(token);
        } else {
            return null;
        }
    }

    getUserdata(userId: string): Observable<any> {
        return this._http
            .get<any>(`${this.apiURL + this.endPoint}/${userId}`)
            .pipe(
                tap((res) => {
                    console.log(res);
                })
            );
    }

    getHeaders(): HttpHeaders {
        const token = this.tokenSubject.value;
        return new HttpHeaders({
            authorization: `Bearer ${token}`,
        });
    }

    isTokenExpired(): boolean {
        const decodedToken = this.decodedAccessToken();
        if (decodedToken) {
            const expiryTime = decodedToken.exp * 1000;
            const currentTime = new Date().getTime();
            return currentTime >= expiryTime;
        }
        return true;
    }

    handleTokenExpiration(): void {
        if (this.isTokenExpired()) {
            console.log('Token has expired');
            this.logout();
        }
    }
}
