import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

interface Product {
    _id: string;
    name: string;
    price: number;
    discount?: number;
    rating: number;
    imgURL: string;
    categories: Array<{
        category: {
            name: string;
        };
    }>;
}

@Component({
    selector: 'app-featured',
    standalone: false,

    templateUrl: './featured.component.html',
    styleUrl: './featured.component.css',
})
export class FeaturedComponent implements OnInit {
    featuredProducts: Product[] = [];
    loading: boolean = false;

    constructor(private _productS: ProductService) {}

    ngOnInit(): void {
        this.loading = true;
        this._productS.getActiveProducts().subscribe((products: Product[]) => {
            // Get all active products
            this.featuredProducts = products;
            this.loading = false;
        });
    }
}
