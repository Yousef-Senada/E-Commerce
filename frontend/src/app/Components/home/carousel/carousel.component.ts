import { Component, OnInit, OnDestroy } from '@angular/core';

interface Slide {
    id: number;
    image: string;
    category: string;
    heading: string;
    description: string;
    primaryBtn: string;
    secondaryBtn: string;
}

@Component({
    selector: 'app-carousel',
    standalone: false,

    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
    slides: Slide[] = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Woman Fashion',
            heading: 'New Collection',
            description:
                "Discover the latest trends in women's fashion with our exclusive new collection featuring premium quality and modern designs.",
            primaryBtn: 'Shop Now',
            secondaryBtn: 'Collection',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Winter Sale',
            heading: 'Hot Deals',
            description:
                "Don't miss out on our biggest winter sale! Get up to 70% off on selected items and enjoy free shipping worldwide.",
            primaryBtn: 'Shop Sale',
            secondaryBtn: 'View All',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            category: 'Premium Quality',
            heading: 'Luxury Line',
            description:
                'Experience the finest materials and craftsmanship with our luxury collection designed for the modern sophisticated woman.',
            primaryBtn: 'Explore',
            secondaryBtn: 'Learn More',
        },
    ];

    currentIndex = 0;
    isTransitioning = false;
    slideDirection = '';
    autoPlay = true;
    autoRotateInterval: any;
    changeSlidesSpeed = 10000;

    ngOnInit(): void {
        if (this.autoPlay) {
            this.startAutoRotate();
        }
    }

    ngOnDestroy(): void {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }

    startAutoRotate(): void {
        this.autoRotateInterval = setInterval(() => {
            this.next();
        }, this.changeSlidesSpeed);
    }

    stopAutoRotate(): void {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }

    next(): void {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.slideDirection = 'next';

        setTimeout(() => {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.isTransitioning = false;
            this.slideDirection = '';
        }, 300);
    }

    prev(): void {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.slideDirection = 'prev';

        setTimeout(() => {
            this.currentIndex =
                (this.currentIndex - 1 + this.slides.length) %
                this.slides.length;
            this.isTransitioning = false;
            this.slideDirection = '';
        }, 300);
    }

    goToSlide(index: number): void {
        if (this.isTransitioning || index === this.currentIndex) return;

        this.isTransitioning = true;
        this.slideDirection = index > this.currentIndex ? 'next' : 'prev';

        setTimeout(() => {
            this.currentIndex = index;
            this.isTransitioning = false;
            this.slideDirection = '';
        }, 300);
    }

    onMouseEnter(): void {
        this.stopAutoRotate();
    }

    onMouseLeave(): void {
        if (this.autoPlay) {
            this.startAutoRotate();
        }
    }

    getCurrentSlide(): Slide {
        return this.slides[this.currentIndex];
    }
}
