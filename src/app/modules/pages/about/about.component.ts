import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FadeInOnScrollDirective } from '../../../shared/directives/fade-in-on-scroll.directive';
import { FooterComponent } from '../../home/components/footer/footer.component';
import { HeaderComponent } from '../../home/components/header/header.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../home/data/home-mock.data';
import { AboutStatComponent } from './about-stat.component';
import {
  ABOUT_FEATURES,
  ABOUT_HERO,
  ABOUT_STATS,
  ABOUT_STORY,
  ABOUT_TEAM,
  ABOUT_TIMELINE,
} from './data/about-mock.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    FadeInOnScrollDirective,
    AboutStatComponent,
  ],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  private readonly router = inject(Router);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;

  readonly hero = ABOUT_HERO;
  readonly story = ABOUT_STORY;
  readonly timeline = ABOUT_TIMELINE;
  readonly features = ABOUT_FEATURES;
  readonly stats = ABOUT_STATS;
  readonly team = ABOUT_TEAM;

  onSearch(q: string): void {
    console.debug('[about] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[about] newsletter', email);
  }
}
