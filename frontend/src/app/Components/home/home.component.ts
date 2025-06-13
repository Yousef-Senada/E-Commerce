import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    constructor(private _productS: ProductService) {}
    products: any[] = [];
    loading: boolean = false;
    ngOnInit(): void {
        this.loading = true;
        this._productS.getActiveProducts().subscribe((products) => {
            for (const product of products) {
                product.name = product.name.replace(/ /g, '\n');
                if (product.carousel) {
                    this.products.push(product);
                }
            }
            this.loading = false;
        });
    }
}
