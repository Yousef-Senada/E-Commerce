import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ShareVariabesService } from '../../services/share-variabes.service';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    constructor(
        private _authS: AuthService,
        private _cartS: CartService,
        private sharedVS: ShareVariabesService
    ) {}
    count = 0;
    isLogedin: boolean = false;
    isBarHidden: boolean = true;
    isSideBarHidden: boolean = true;
    isAdmin = false;

    toggleBar() {
        this.sharedVS.toggleBar();
    }
    toggleSideBar() {
        this.sharedVS.toggleSideBar();
    }

    ngOnInit(): void {
        this.sharedVS.isBarHidden$.subscribe((value) => {
            this.isBarHidden = value;
        });
        this.sharedVS.isSideBarHidden$.subscribe((value) => {
            this.isSideBarHidden = value;
        });
        if (this._authS.isAdmin()) {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
        this._authS.getAccessToken().subscribe((token) => {
            if (token) {
                this.isLogedin = true;
            } else {
                this.isLogedin = false;
            }
        });
        if (this._authS.isAuthenticated()) {
            this._cartS.countProcuctInCart().subscribe((count) => {
                this.count = count;
            });
        } else {
            this.count = 0;
        }
    }
}
