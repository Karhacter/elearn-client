// Header component with categories and dropdowns
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { NavItem, UserPreview, CategoryItem } from '../../models/home-ui.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly router = inject(Router);
  protected readonly cart = inject(CartService);
  @Input() logoLabel = 'Educal';
  @Input() navItems: NavItem[] = [];
  @Input() categories: CategoryItem[] = [];
  @Input() user: UserPreview | null = null;
  @Input() searchPlaceholder = 'Search courses, skills, instructors…';
  @Input() ctaLabel = 'Try free';

  @Output() readonly searchSubmit = new EventEmitter<string>();
  @Output() readonly ctaClick = new EventEmitter<void>();
  @Output() readonly avatarClick = new EventEmitter<void>();

  searchQuery = '';

  onSearchSubmit(): void {
    this.searchSubmit.emit(this.searchQuery.trim());
  }

  onCta(): void {
    void this.router.navigate(['/sign-up']);
  }

  onAvatar(): void {
    this.avatarClick.emit();
  }
}
