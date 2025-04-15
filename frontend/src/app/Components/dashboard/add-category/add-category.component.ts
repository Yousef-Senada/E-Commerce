import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-add-category',
    standalone: false,

    templateUrl: './add-category.component.html',
    styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
    constructor(private _categoryS: CategoryService) {}
    categoryForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
        ]),
        description: new FormControl('', [
            Validators.minLength(0),
            Validators.maxLength(200),
        ]),
    });
    CreateCategory() {
        if (this.categoryForm.valid) {
            this._categoryS.addCategory(this.categoryForm.value).subscribe();
            this.categoryForm.reset();
        } else {
            console.log('the form is invalid');
        }
    }
}
