import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    constructor(private _authS: AuthService) {}
    ngOnInit(): void {
        if (this._authS.isAuthenticated()) {
            this._authS.handleTokenExpiration();
        }
    }
}
