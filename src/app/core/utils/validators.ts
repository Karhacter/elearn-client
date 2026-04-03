import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordSecurityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumeric = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

        const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

        if (!isValid) {
            return {
                passwordSecurity: {
                    hasMinLength,
                    hasUpperCase,
                    hasLowerCase,
                    hasNumeric,
                    hasSpecialChar
                }
            };
        }
        return null;
    };
}
