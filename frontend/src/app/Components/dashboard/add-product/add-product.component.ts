import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
    selector: 'app-add-product',
    standalone: false,
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
    constructor(
        private _productS: ProductService,
        private _category: CategoryService
    ) {}
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

    productForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
        ]),
        description: new FormControl('', [Validators.maxLength(200)]),
        price: new FormControl('', [Validators.required, Validators.min(0.01)]),
        quantity: new FormControl('', [Validators.required, Validators.min(1)]),
        category: new FormControl(''),
        imgURL: new FormControl('', [Validators.required]),
    });

    imagePreview: string | null = null;

    onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            this.productForm.patchValue({ imgURL: file });
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    CreateProduct(): void {
        const productData = new FormData();
        productData.append('name', this.productForm.get('name')?.value || '');
        productData.append(
            'desc',
            this.productForm.get('description')?.value || ''
        );
        productData.append('price', this.productForm.get('price')?.value || '');
        productData.append(
            'stock',
            this.productForm.get('quantity')?.value || ''
        );
        productData.append(
            'categories[0][category]',
            this.productForm.get('category')?.value || ''
        );
        productData.append(
            'imgURL',
            this.productForm.get('imgURL')?.value || ''
        );
        if (this.productForm.valid) {
            this._productS.addProduct(productData).subscribe((res) => {
                if (res) {
                    this.productForm.reset();
                    this.imagePreview = null;
                    console.log('Product added sucesssfully');
                }
            });
        } else {
            console.log('form is invalid');
        }
    }
}
