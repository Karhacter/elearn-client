import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseSummary } from '../../models/home-ui.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  private readonly router = inject(Router);
  @Input() headline = 'Level up with';
  @Input() accentWord = 'Online';
  @Input() headlineSuffix = 'learning';
  @Input() subcopy =
    'Neon-lit courses, pro instructors, and progress you can feel — built for builders who learn at lightspeed.';
  @Input() ctaLabel = 'View all courses';
  @Input() ctaRoute = '/';
  @Input() bannerImageUrl =
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80';
  @Input() secondaryImageUrl =
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80';
  @Input() featuredCourse: CourseSummary | null = null;

  @Output() readonly ctaClick = new EventEmitter<void>();
  @Output() readonly featuredClick = new EventEmitter<CourseSummary>();

  onCta(): void {
    this.router.navigate(['/courses/grid']);
  }

  onFeatured(): void {
    if (this.featuredCourse) {
      this.featuredClick.emit(this.featuredCourse);
    }
  }
}
