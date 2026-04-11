import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-banner.component.html',
})
export class PromoBannerComponent {
  @Input() headline = 'You can be your own guiding star with our help.';
  @Input() ctaLabel = 'Get started';

  @Output() readonly ctaClick = new EventEmitter<void>();

  onCta(): void {
    this.ctaClick.emit();
  }
}
