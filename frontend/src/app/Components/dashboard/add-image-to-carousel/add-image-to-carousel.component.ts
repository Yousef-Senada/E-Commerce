import { Component } from '@angular/core';

@Component({
    selector: 'app-add-image-to-carousel',
    standalone: false,

    templateUrl: './add-image-to-carousel.component.html',
    styleUrl: './add-image-to-carousel.component.css',
})
export class AddImageToCarouselComponent {
    imagePreview: string | ArrayBuffer | null = null;

    onFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
}
