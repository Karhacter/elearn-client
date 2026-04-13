import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../home/components/header/header.component';
import { FooterComponent } from '../../home/components/footer/footer.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../home/data/home-mock.data';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  submitted = false;

  readonly inputBase =
    'w-full rounded-xl border bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 dark:bg-white/5 dark:text-slate-100';
  readonly inputNormal =
    'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10 dark:border-white/10 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/20';
  readonly inputError =
    'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60 dark:focus:border-red-400';

  onSearch(q: string): void {
    console.debug('[signin] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[signin] newsletter', email);
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.debug('[signin]', this.form.getRawValue());
  }

  fieldInvalid(name: 'email' | 'password'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted);
  }
}
