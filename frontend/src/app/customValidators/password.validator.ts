import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static matchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get('password')?.value;
      const retypePassword = control.value;
      if (!retypePassword) {
        return null;
      }
      return password === retypePassword ? null : { passwordDisMatch: true };
    };
  }

  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasNumber = /[0-9]/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const minLength = value.length >= 8;

      const passwordValid =
        hasNumber && hasUpper && hasLower && hasSpecial && minLength;
      return passwordValid ? null : { passwordStrength: true };
    };
  }

  static matchNewPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get('newPassword')?.value;
      const retypePassword = control.value;
      if (!retypePassword) {
        return null;
      }
      return password === retypePassword ? null : { passwordDisMatch: true };
    };
  }
}

export class AgeValidator {
  static ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthdate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthdate.getFullYear();
      if (age < 18) {
        return { ageTooYoung: true };
      } else if (age >= 100) {
        return { ageTooOld: true };
      }
      return null;
    };
  }
}
