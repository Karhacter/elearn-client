import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../../home/data/home-mock.data';

type CheckoutStep = 1 | 2 | 3;

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;

  readonly step = signal<CheckoutStep>(1);
  readonly submitting = signal(false);
  readonly orderComplete = signal(false);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s+\-().]{7,}$/)]],
    paymentMethod: this.fb.nonNullable.control<'card' | 'cod'>('card', {
      validators: [Validators.required],
    }),
  });

  submitted = false;

  readonly inputBase =
    'w-full rounded-xl border bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-4 dark:bg-white/5 dark:text-slate-100';
  readonly inputNormal =
    'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10 dark:border-white/10 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/20';
  readonly inputError =
    'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500/60 dark:focus:border-red-400';

  readonly steps: { n: CheckoutStep; label: string }[] = [
    { n: 1, label: 'Billing' },
    { n: 2, label: 'Payment' },
    { n: 3, label: 'Review' },
  ];

  ngOnInit(): void {
    if (this.cart.isEmpty()) {
      void this.router.navigate(['/cart']);
    }
  }

  onSearch(q: string): void {
    console.debug('[checkout] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[checkout] newsletter', email);
  }

  jumpToStep(n: CheckoutStep): void {
    if (this.submitting() || this.orderComplete()) return;
    if (n >= this.step()) return;
    this.step.set(n);
  }

  nextFromBilling(): void {
    const g = this.form.controls;
    g.fullName.markAsTouched();
    g.email.markAsTouched();
    g.phone.markAsTouched();
    if (g.fullName.invalid || g.email.invalid || g.phone.invalid) {
      return;
    }
    this.step.set(2);
  }

  nextFromPayment(): void {
    const m = this.form.controls.paymentMethod;
    m.markAsTouched();
    if (m.invalid) return;
    this.step.set(3);
  }

  back(): void {
    this.step.update((s) => (s > 1 ? ((s - 1) as CheckoutStep) : s));
  }

  fieldInvalid(name: 'fullName' | 'email' | 'phone'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted);
  }

  placeOrder(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid || this.cart.isEmpty()) {
      if (this.form.invalid) {
        this.step.set(1);
      }
      return;
    }
    this.submitting.set(true);
    window.setTimeout(() => {
      this.submitting.set(false);
      this.orderComplete.set(true);
      this.cart.clear();
    }, 1600);
  }

  shopAgain(): void {
    void this.router.navigate(['/courses/grid']);
  }
}
