import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-search-bar',
    standalone: false,

    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
    isHidden: boolean = false;
    selectedCategory: string = '';
    constructor(private _category: CategoryService) {}
    categories: { name: string; value?: string }[] = [];
    ngOnInit(): void {
        this._category.getCategories().subscribe((categories) => {
            categories.forEach((category: any) => {
                this.categories.push({
                    name: category.name,
                    value: category._id,
                });
            });
        });
    }

    toggleDropdown(): void {
        this.isHidden ? (this.isHidden = false) : (this.isHidden = true);
    }
    selectCategory(category: string) {
        this.selectedCategory = category;
        this.isHidden = false;
    }
}
