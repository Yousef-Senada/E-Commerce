import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    AgeValidator,
    PasswordValidator,
} from '../../customValidators/password.validator';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: false,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    title = 'Register';
    submitted = false;
    success: boolean = false;
    loading: boolean = false;

    constructor(
        private _register: RegisterService,
        private _router: Router,
        private _authS: AuthService
    ) {}

    registerForm = new FormGroup({
        firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
        ]),
        lastName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.pattern(
                '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
        ]),

        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            PasswordValidator.passwordStrength(),
        ]),
        confirmPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            PasswordValidator.matchPassword(),
        ]),
        birthdate: new FormControl('', [
            Validators.required,
            AgeValidator.ageValidator(),
        ]),
        phone: new FormControl('', [
            Validators.required,
            Validators.pattern('^(?:\\+?20|0)?1[0125]\\d{8}$'),
        ]),
        address1: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(50),
        ]),
        address2: new FormControl('', [
            Validators.minLength(10),
            Validators.maxLength(50),
        ]),
        addresses: new FormControl([]),
        city: new FormControl('', [Validators.required]),
    });

    onRegister() {
        this.submitted = true;

        let phone = this.registerForm.get('phone')?.value;
        phone = String(phone);
        if (phone && !phone.startsWith('0') && phone.length === 10) {
            phone = '0' + phone;
        }
        this.registerForm.get('phone')?.setValue(phone ?? null);

        const userData = {
            ...this.registerForm.value,
            addresses: [
                {
                    address: this.registerForm.value.address1,
                },
                {
                    address: this.registerForm.value.address2,
                },
            ],
        };
        if (this.registerForm.valid) {
            this.loading = true;
            this._register.register(userData).subscribe({
                next: () => {
                    this.loading = false;
                    window.scrollTo(0, 0);
                    this.success = true;
                    setTimeout(() => {
                        this._router.navigate(['/home']);
                    }, 800);

                    const loginData = {
                        email: this.registerForm.value.email,
                        password: this.registerForm.value.password,
                    };
                    this._authS.login(loginData).subscribe({
                        error: (err) => {
                            console.error('Login Error:', err.message);
                            this.loading = false;
                        },
                    });
                },
                error: (err) => {
                    console.error('Signup Error:', err.message);
                    this.loading = false;
                },
            });
        } else {
            console.log('Form is invalid');
        }
    }
}
