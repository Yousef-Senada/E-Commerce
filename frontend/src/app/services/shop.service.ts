import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root',
})
export class ShopService {
    private categorySubject = new BehaviorSubject<any>(null);
    category$ = this.categorySubject.asObservable();

    setCategory(category: any) {
        this.categorySubject.next(category);
    }
}
