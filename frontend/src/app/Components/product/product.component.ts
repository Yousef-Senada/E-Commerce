import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product',
    standalone: false,

    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
})
export class ProductComponent {
    productId!: string;
    imgMainURl!: string;
    product: any;
    loading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private _productS: ProductService
    ) {}

    ngOnInit() {
        this.imgMainURl = this._productS.uploadURL;
        this.route.paramMap.subscribe((params) => {
            this.productId = params.get('id')!;
        });
        this._productS.getProductById(this.productId).subscribe((product) => {
            this.product = product;
            this.loading = false;
        });
    }
}
