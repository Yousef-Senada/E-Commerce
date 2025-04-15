import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-categories',
    standalone: false,

    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
    constructor(
        private _productS: ProductService,
        private _categoryS: CategoryService
    ) {}
    @ViewChild('productSlider', { static: false }) productSlider!: ElementRef;

    scrollLeft() {
        this.productSlider.nativeElement.scrollBy({
            left: -256,
            behavior: 'smooth',
        });
    }

    scrollRight() {
        this.productSlider.nativeElement.scrollBy({
            left: 256,
            behavior: 'smooth',
        });
    }
    products = [];
    ngOnInit(): void {
        this._categoryS.getCategories().subscribe((categories) => {
            for (const category of categories) {
                console.log(category.name);
            }
        });
        this._productS.getActiveProducts().subscribe((products) => {
            this.products = products;
        });
    }
}
