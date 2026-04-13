import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartLineItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart-line-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-line-list.component.html',
})
export class CartLineListComponent {
  @Input({ required: true }) lines: CartLineItem[] = [];

  @Output() readonly quantityChange = new EventEmitter<{ lineId: string; quantity: number }>();
  @Output() readonly remove = new EventEmitter<string>();
}
