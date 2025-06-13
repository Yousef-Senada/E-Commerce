import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShareVariabesService {
    constructor() {}
    private _isBarHidden = new BehaviorSubject<boolean>(true);
    private _isSideBarHidden = new BehaviorSubject<boolean>(true);
    private _isSortBarHidden = new BehaviorSubject<boolean>(false);
    isBarHidden$ = this._isBarHidden.asObservable();
    isSortBarHidden$ = this._isSortBarHidden.asObservable();
    isSideBarHidden$ = this._isSideBarHidden.asObservable();

    toggleBar() {
        this._isBarHidden.next(!this._isBarHidden.value);
    }

    setBarHidden(value: boolean) {
        this._isBarHidden.next(value);
    }

    toggleSideBar() {
        this._isSideBarHidden.next(!this._isBarHidden.value);
    }

    setSideBaHidden(value: boolean) {
        this._isSideBarHidden.next(value);
    }

    toggleSortBar() {
        this._isSortBarHidden.next(!this._isSortBarHidden.value);
    }

    setToggleSortBar(value: boolean) {
        this._isSortBarHidden.next(value);
    }
}
