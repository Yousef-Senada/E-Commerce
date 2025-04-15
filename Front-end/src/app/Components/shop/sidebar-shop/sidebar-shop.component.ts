import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Subject, take } from 'rxjs';
import { ShopService } from '../../../services/shop.service';

@Component({
    selector: 'app-sidebar-shop',
    standalone: false,

    templateUrl: './sidebar-shop.component.html',
    styleUrl: './sidebar-shop.component.css',
})
export class SidebarShopComponent implements OnInit, OnDestroy, AfterViewInit {
    private unsubscribe$ = new Subject<void>();

    categories: any[] = [];
    productsCategories: any[] = [];
    min: number = Infinity;
    max: number = -Infinity;

    constructor(
        private _categoryS: CategoryService,
        private _productS: ProductService,
        private _shopS: ShopService
    ) {}

    ngOnInit(): void {
        this._categoryS
            .getCategories()
            .pipe(take(1))
            .subscribe((data) => {
                this.categories = data;
            });
        this.handlePriceRange();
        this.handleProductInCategory();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this._shopS.category$.subscribe((category) => {
                if (category) {
                    this.handleCategory(category);
                }
            });
        }, 1300);
    }

    handleProductInCategory() {
        this.productsCategories = [];
        this._productS.getActiveProducts().subscribe((products) => {
            for (const product of products) {
                const categoryName = product.categories[0]?.category?.name;
                if (categoryName) {
                    if (!this.productsCategories[categoryName]) {
                        this.productsCategories[categoryName] = 0;
                    }
                    this.productsCategories[categoryName]++;
                }
            }
        });
    }

    handleCategory(category: any) {
        if (category?.name) {
            this._categoryS.setSelectedCategory(category.name);
        }
    }

    handleRating(rating: number) {
        this._productS.setRating(rating);
    }

    handlePriceRange() {
        this._productS
            .getProducts()
            .pipe(take(1))
            .subscribe((data) => {
                if (data.length > 0) {
                    this.min = Infinity;
                    this.max = -Infinity;
                    data.forEach((product: any) => {
                        this.min = Math.min(this.min, product.price);
                        this.max = Math.max(this.max, product.price);
                    });
                    this._productS.setPriceRange(this.min, this.max);
                }
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
