import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../../services/product.service';

@Component({
    selector: 'app-price-filter-slider',
    standalone: false,

    templateUrl: './price-filter-slider.component.html',
    styleUrl: './price-filter-slider.component.css',
})
export class PriceFilterSliderComponent implements OnChanges {
    constructor(private _productS: ProductService) {}
    @Input() priceRange: { min: number; max: number } = { min: 100, max: 200 };
    minPrice: number = this.priceRange.min;
    maxPrice: number = this.priceRange.max;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['priceRange'] && changes['priceRange'].currentValue) {
            this.minPrice = this.priceRange.min;
            this.maxPrice = this.priceRange.max;
        }
    }

    updatePriceRangeMin() {
        if (this.maxPrice < this.minPrice + 10) {
            if (this.maxPrice === this.priceRange.max) {
                return;
            } else {
                this.maxPrice = this.minPrice + 10;
            }
        }
    }
    updatePriceRangeMax() {
        if (this.minPrice > this.maxPrice - 10) {
            if (this.minPrice === this.priceRange.min) {
                return;
            } else {
                this.minPrice = this.maxPrice - 10;
            }
        }
    }

    filter() {
        this._productS.setPriceRange(this.minPrice, this.maxPrice);
    }
}
