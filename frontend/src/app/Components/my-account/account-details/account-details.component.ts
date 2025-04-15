import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../../customValidators/password.validator';
import { AccountDetailsService } from '../../../services/account-details.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-account-details',
    standalone: false,

    templateUrl: './account-details.component.html',
    styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
    constructor(
        private _accountS: AccountDetailsService,
        private _authS: AuthService,
        private _router: Router
    ) {}
    loading = false;
    ngOnInit(): void {
        this.loading = true;
        this._accountS.getAccountDetails().subscribe(
            (user) => {
                this.accountForm.patchValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                this.loading = false;
            },
            (error) => {
                console.error('Failed to load account details:', error);
                this._authS.logout();
                this._router.navigate(['../login']);
                this.loading = false;
            }
        );
    }
    submitted = false;
    accountForm = new FormGroup({
        firstName: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(15),
        ]),
        lastName: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(15),
        ]),
        email: new FormControl('', [
            Validators.pattern(
                '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
        ]),
        phone: new FormControl('', [
            Validators.pattern('^(?:\\+?20|0)?1[0125]\\d{8}$'),
        ]),
        password: new FormControl('', Validators.maxLength(20)),
        newPassword: new FormControl('', [
            Validators.minLength(8),
            Validators.maxLength(20),
            PasswordValidator.passwordStrength(),
        ]),
        confirmPassword: new FormControl('', [
            Validators.required,
            PasswordValidator.matchNewPassword(),
        ]),
    });

    onUpdate() {
        this.submitted = true;
        let phone = this.accountForm.get('phone')?.value;
        phone = String(phone);
        if (phone && !phone.startsWith('0') && phone.length === 10) {
            phone = '0' + phone;
        }
        this.accountForm.get('phone')?.setValue(phone ?? null);

        this._accountS.updateAccountDetails(this.accountForm.value).subscribe();
    }
}
