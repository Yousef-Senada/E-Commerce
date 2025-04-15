import { Component, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-loading-page',
    standalone: false,
    templateUrl: './loading-page.component.html',
    styleUrl: './loading-page.component.css',
})
export class LoadingPageComponent {
    constructor(private renderer: Renderer2) {}
    ngOnInit() {
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
        window.scrollTo(0, 0);
        window.addEventListener('beforeunload', () => {
            window.scrollTo(0, 0);
        });
    }

    ngOnDestroy() {
        this.renderer.removeStyle(document.body, 'overflow');
    }
}
