import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ShareVariabesService } from '../../services/share-variabes.service';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'app-shop',
    standalone: false,
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
    constructor(
        private _productS: ProductService,
        private _categoryS: CategoryService,
        private _sharedVR: ShareVariabesService
    ) {}
    loading: boolean = false;
    title: string = 'Shop';
    isHoverProduct: boolean = false;
    isSortBarHidden: boolean = false;
    products: {
        categories: { category: { name: string } }[];
        price: number;
        rating: number;
        name: string;
    }[] = [];
    originalProducts: {
        categories: { category: { name: string } }[];
        price: number;
        rating: number;
        name: string;
    }[] = [];

    filteredProducts: {
        categories: { category: { name: string } }[];
        price: number;
        rating: number;
        name: string;
    }[] = [];

    ngOnInit(): void {
        this.loadActiveProducts();
        this._sharedVR.isSortBarHidden$.subscribe((value) => {
            this.isSortBarHidden = value;
        });
    }

    setSortBar() {
        this._sharedVR.setToggleSortBar(true);
    }

    private loadActiveProducts(): void {
        this.loading = true;
        this._productS.getActiveProducts().subscribe((data) => {
            this.products = data;
            this.originalProducts = [...data];
            this.subscribeToCategoryChanges();
            this.subscribeToPriceChanges();
            this.subscribeToRatingChanges();
            this.loading = false;
        });
    }

    private subscribeToCategoryChanges(): void {
        this._categoryS.selectedCategory$.subscribe((category) => {
            if (category !== '') {
                this.filteredProducts = this.originalProducts.filter(
                    (product) =>
                        product.categories[0].category.name === category
                );
            } else {
                this.filteredProducts = [...this.originalProducts];
            }
            this.applyFilters();
        });
    }

    private subscribeToPriceChanges(): void {
        this._productS.selectedprice$.subscribe((priceRange) => {
            this.filteredProducts = this.originalProducts.filter((product) => {
                if (priceRange.min === 0 && priceRange.max === 0) {
                    return true;
                }
                return (
                    product.price >= priceRange.min &&
                    product.price <= priceRange.max
                );
            });
            this.applyFilters();
        });
    }

    private subscribeToRatingChanges(): void {
        this._productS.selectedRating$.subscribe((rating) => {
            this.filteredProducts = this.originalProducts.filter((product) => {
                if (rating !== 0) {
                    return product.rating >= rating;
                }
                return true;
            });
            this.applyFilters();
        });
    }

    onSortChange(event: Event): void {
        const sortOption = (event.target as HTMLSelectElement).value;
        switch (sortOption) {
            case 'A-Z':
                this.filteredProducts.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;
            case 'Z-A':
                this.filteredProducts.sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
                break;
            case 'Low-To-High':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'High-To-Low':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                this.filteredProducts = [...this.originalProducts];
                break;
        }
        this.applyFilters();
    }

    private applyFilters(): void {
        this.products = this.filteredProducts;
    }

    onMouseHoverProduct() {
        this.isHoverProduct = true;
    }

    onMouseLeaveProduct() {
        this.isHoverProduct = false;
    }
}
