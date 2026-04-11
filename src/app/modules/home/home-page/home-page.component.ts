import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MOCK_CATEGORIES,
  MOCK_COURSES_A,
  MOCK_COURSES_B,
  MOCK_EVENTS,
  MOCK_FEATURED_COURSE,
  MOCK_NAV,
  MOCK_PRICING_PLANS,
  MOCK_USER,
} from '../data/home-mock.data';
import {
  CategoryItem,
  CourseSummary,
  HomeEventItem,
  PricingPlan,
} from '../models/home-ui.model';
import { CategoryListComponent } from '../components/category-list/category-list.component';
import { CourseSectionComponent } from '../components/course-section/course-section.component';
import { EventsSectionComponent } from '../components/events-section/events-section.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeroComponent } from '../components/hero/hero.component';
import { PricingSectionComponent } from '../components/pricing-section/pricing-section.component';
import { PromoBannerComponent } from '../components/promo-banner/promo-banner.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    CategoryListComponent,
    CourseSectionComponent,
    EventsSectionComponent,
    PricingSectionComponent,
    PromoBannerComponent,
    FooterComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;
  readonly featuredCourse = MOCK_FEATURED_COURSE;
  readonly trendingCourses = MOCK_COURSES_A;
  readonly newCourses = MOCK_COURSES_B;
  readonly events = MOCK_EVENTS;
  readonly pricingPlans = MOCK_PRICING_PLANS;

  onSearch(q: string): void {
    console.debug('[home] search', q);
  }

  onCategory(cat: CategoryItem): void {
    console.debug('[home] category', cat.id);
  }

  onCourse(course: CourseSummary): void {
    console.debug('[home] course', course.id);
  }

  onEvent(ev: HomeEventItem): void {
    console.debug('[home] event', ev.id);
  }

  onPlan(plan: PricingPlan): void {
    console.debug('[home] pricing', plan.id);
  }

  onPromoCta(): void {
    console.debug('[home] promo cta');
  }

  onNewsletter(email: string): void {
    console.debug('[home] newsletter', email);
  }
}
