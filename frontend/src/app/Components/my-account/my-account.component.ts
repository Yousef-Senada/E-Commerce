import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ShareVariabesService } from '../../services/share-variabes.service';

@Component({
    selector: 'app-my-account',
    standalone: false,

    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.css',
})
export class MyAccountComponent {
    title = 'My account';
    accountDetails = false;
    isSortBarHidden = false;
    constructor(
        private _authS: AuthService,
        private _router: Router,
        private _sharedVR: ShareVariabesService
    ) {}
    ngOnInit(): void {
        this._sharedVR.isSortBarHidden$.subscribe((value) => {
            this.isSortBarHidden = value;
        });
    }

    setSortBar() {
        this._sharedVR.setToggleSortBar(true);
    }

    logout(): void {
        this._router.navigate(['login']);
        this._authS.logout();
    }
}
