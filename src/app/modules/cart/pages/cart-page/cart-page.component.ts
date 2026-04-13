import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../../home/data/home-mock.data';
import { CartLineListComponent } from '../../components/cart-line-list/cart-line-list.component';
import { CartOrderSummaryComponent } from '../../components/cart-order-summary/cart-order-summary.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    CartLineListComponent,
    CartOrderSummaryComponent,
  ],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;

  onSearch(q: string): void {
    console.debug('[cart] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[cart] newsletter', email);
  }

  onQty(e: { lineId: string; quantity: number }): void {
    this.cart.updateQuantity(e.lineId, e.quantity);
  }

  onRemove(lineId: string): void {
    this.cart.removeLine(lineId);
  }

  checkout(): void {
    void this.router.navigate(['/checkout']);
  }
}
