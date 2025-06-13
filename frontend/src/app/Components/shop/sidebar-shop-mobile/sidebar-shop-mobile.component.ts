import { Component, OnInit } from '@angular/core';
import { ShareVariabesService } from '../../../services/share-variabes.service';

@Component({
    selector: 'app-sidebar-shop-mobile',
    standalone: false,

    templateUrl: './sidebar-shop-mobile.component.html',
    styleUrl: './sidebar-shop-mobile.component.css',
})
export class SidebarShopMobileComponent implements OnInit {
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
