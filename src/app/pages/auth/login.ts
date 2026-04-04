import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../core/services/auth.service';
import { passwordSecurityValidator } from '../../core/utils/validators';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RouterModule, RippleModule, AppFloatingConfigurator],
    templateUrl: './login.html'
})
export class Login {
    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    isLoading = false;
    errorMessage = '';

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordSecurityValidator()]],
        rememberMe: [false]
    });

    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        const { email, password } = this.loginForm.value;

        this.authService.login({ email, password }).subscribe({
            next: (response) => {
                // After successful login, check auth to verify role as requested
                this.authService.checkAuth().subscribe({
                    next: (authResponse) => {
                        this.isLoading = false;
                        const role = authResponse.data?.user?.role || authResponse.data?.role;
                        console.log(role);

                        if ((role && role.toUpperCase() === 'ADMIN') || (role && role.toUpperCase() === 'INSTRUCTOR') || (role && role.toUpperCase() === 'MODERATOR')) {
                            this.router.navigate(['/']);
                        } else {
                            this.router.navigate(['/auth/access']);
                        }
                    },
                    error: (err) => {
                        this.isLoading = false;
                        this.errorMessage = 'Auth check failed after login.';
                    }
                });
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
            }
        });
    }
}
