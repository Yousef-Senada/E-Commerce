import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    Input,
} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-carousel',
    standalone: false,
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css',
})
export class CarouselComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild('slider', { static: false }) slider!: ElementRef;
    constructor(private _productS: ProductService, private _router: Router) {}
    ngOnInit(): void {
        this.imgMainURl = this._productS.uploadURL;
    }
    imgMainURl: string = '';
    @Input() products: any[] = [];

    active: number = 0;
    interval: any;

    navigate() {
        this._router.navigate(['/shop']);
    }
    ngAfterViewInit() {
        this.startAutoSlide();
    }

    startAutoSlide() {
        this.interval = setInterval(() => this.next(), 6000);
    }

    stopAutoSlide() {
        clearInterval(this.interval);
    }

    reloadSlider() {
        const sliderElement = this.slider.nativeElement;
        const items = sliderElement.children;
        if (items[this.active]) {
            sliderElement.style.left = -items[this.active].offsetLeft + 'px';
        }

        this.stopAutoSlide();
        this.startAutoSlide();
    }

    next() {
        this.active =
            this.active + 1 < this.products.length ? this.active + 1 : 0;
        this.reloadSlider();
    }

    prev() {
        this.active =
            this.active - 1 >= 0 ? this.active - 1 : this.products.length - 1;
        this.reloadSlider();
    }

    goToSlide(index: number) {
        this.active = index;
        this.reloadSlider();
    }

    ngOnDestroy() {
        this.stopAutoSlide();
    }
}
