import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartDiscount } from '../../models/cart.model';

@Component({
  selector: 'app-cart-order-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-order-summary.component.html',
})
export class CartOrderSummaryComponent {
  @Input({ required: true }) subtotal = 0;
  @Input() discount: CartDiscount | null = null;
  @Input({ required: true }) total = 0;
  @Input() disabledCheckout = false;

  @Output() readonly proceed = new EventEmitter<void>();
}
