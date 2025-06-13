import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShareVariabesService } from '../../services/share-variabes.service';

@Component({
    selector: 'app-sidebar',
    standalone: false,

    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
    constructor(
        private _authS: AuthService,
        private _shareVR: ShareVariabesService
    ) {}
    isLogedin: boolean = false;
    isAdmin = false;
    isSideBarHidden = true;
    ngOnInit(): void {
        this._shareVR.isSideBarHidden$.subscribe((value) => {
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
    }
    toggleSideBar() {
        this._shareVR.setSideBaHidden(true);
    }
}
