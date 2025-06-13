import { Component } from '@angular/core';
import { ShareVariabesService } from '../../../services/share-variabes.service';

@Component({
    selector: 'app-sidebar-account-mobile',
    standalone: false,

    templateUrl: './sidebar-account-mobile.component.html',
    styleUrl: './sidebar-account-mobile.component.css',
})
export class SidebarAccountMobileComponent {
    constructor(private _shareVR: ShareVariabesService) {}
    isSortBarHidden: boolean = false;
    ngOnInit(): void {
        this._shareVR.isSortBarHidden$.subscribe((value) => {
            this.isSortBarHidden = value;
        });
    }
    toggleSortBar() {
        this._shareVR.toggleSortBar();
    }
}
