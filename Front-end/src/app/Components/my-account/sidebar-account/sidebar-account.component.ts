import { Component } from '@angular/core';
import { ShareVariabesService } from '../../../services/share-variabes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-sidebar-account',
    standalone: false,

    templateUrl: './sidebar-account.component.html',
    styleUrl: './sidebar-account.component.css',
})
export class SidebarAccountComponent {
    accountDetails = false;
    constructor(private _authS: AuthService, private _router: Router) {}

    logout(): void {
        this._router.navigate(['login']);
        this._authS.logout();
    }
}
