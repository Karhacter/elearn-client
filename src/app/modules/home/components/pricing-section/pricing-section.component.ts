import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PricingPlan } from '../../models/home-ui.model';
import { BillingPeriod, PricingCardComponent } from './pricing-card.component';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [CommonModule, PricingCardComponent],
  templateUrl: './pricing-section.component.html',
})
export class PricingSectionComponent {
  @Input() sectionTitle = 'Simple All Inclusive Pricing';
  @Input() highlightWord = 'Pricing';
  @Input() subtitle = 'No contracts. No surprise fees.';
  @Input() monthlyLabel = 'Monthly Plan';
  @Input() annualLabel = 'Annual Plan';
  @Input() plans: PricingPlan[] = [];

  @Output() readonly billingChange = new EventEmitter<BillingPeriod>();
  @Output() readonly planSelect = new EventEmitter<PricingPlan>();

  billing: BillingPeriod = 'annual';

  get titleParts(): { before: string; after: string } {
    const i = this.sectionTitle.indexOf(this.highlightWord);
    if (i < 0) return { before: this.sectionTitle, after: '' };
    return {
      before: this.sectionTitle.slice(0, i),
      after: this.sectionTitle.slice(i + this.highlightWord.length),
    };
  }

  setBilling(b: BillingPeriod): void {
    this.billing = b;
    this.billingChange.emit(b);
  }

  onPlanCta(plan: PricingPlan): void {
    this.planSelect.emit(plan);
  }
}
