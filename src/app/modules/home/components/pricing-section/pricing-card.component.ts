import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PricingPlan } from '../../models/home-ui.model';

export type BillingPeriod = 'monthly' | 'annual';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-card.component.html',
})
export class PricingCardComponent {
  @Input({ required: true }) plan!: PricingPlan;
  @Input() billing: BillingPeriod = 'annual';

  @Output() readonly ctaClick = new EventEmitter<PricingPlan>();

  price(): number {
    return this.billing === 'annual' ? this.plan.priceAnnual : this.plan.priceMonthly;
  }

  cycle(): string {
    return this.billing === 'annual'
      ? this.plan.cycleSuffixAnnual
      : this.plan.cycleSuffixMonthly;
  }

  onCta(): void {
    this.ctaClick.emit(this.plan);
  }
}
