import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../../core/services/theme.service';
import { NavItem, UserPreview } from '../../models/home-ui.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);

  @Input() logoLabel = 'NeoLearn';
  @Input() navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Courses', route: '/' },
    { label: 'Dashboard', route: '/' },
    { label: 'Contact', route: '/' },
  ];
  @Input() user: UserPreview | null = {
    name: 'Aya K.',
    avatarUrl: 'https://i.pravatar.cc/80?img=5',
  };
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
    this.ctaClick.emit();
  }

  onAvatar(): void {
    this.avatarClick.emit();
  }
}
