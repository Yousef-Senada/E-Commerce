import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { ShopService } from '../../../services/shop.service';

@Component({
    selector: 'app-select-menu',
    standalone: false,

    templateUrl: './select-menu.component.html',
    styleUrl: './select-menu.component.css',
})
export class SelectMenuComponent {
    isHidden: boolean = false;
    constructor(
        private _category: CategoryService,
        private _router: Router,
        private _shopS: ShopService
    ) {}
    categories: { name: string; value?: string }[] = [];
    ngOnInit(): void {
        this._category.getCategories().subscribe((categories) => {
            categories.forEach((category: any) => {
                this.categories.push({
                    name: category.name,
                    value: category._id,
                });
            });
        });
    }
    handleItems(category: any) {
        this._router.navigate(['/shop']);
        this._shopS.setCategory(category);
        this.menuToggle();
    }
    menuToggle(): void {
        this.isHidden ? (this.isHidden = false) : (this.isHidden = true);
    }
}
