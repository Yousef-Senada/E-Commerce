import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: false,

    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    title: string = 'Login';
    error: boolean = false;
    success: boolean = false;
    loading: boolean = false;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private _authS: AuthService) {}

    onLogin() {
        if (this.loginForm.valid) {
            this.loading = true;
            this._authS.login(this.loginForm.value).subscribe({
                next: () => {
                    this.loading = false;
                    this.error = false;
                    this.success = true;
                },
                error: () => {
                    this.error = true;
                    this.loading = false;
                },
            });
        } else {
            this.error = true;
            this.loading = false;
        }
    }
}
