import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MOCK_CATEGORIES,
  MOCK_COURSES_A,
  MOCK_COURSES_B,
  MOCK_EVENTS,
  MOCK_FEATURED_COURSE,
  MOCK_NAV,
  MOCK_PRICING_PLANS,
  MOCK_USER,
} from '../../data/home-mock.data';
import {
  CategoryItem,
  CourseSummary,
  HomeEventItem,
  PricingPlan,
} from '../../models/home-ui.model';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { CourseSectionComponent } from '../../components/course-section/course-section.component';
import { EventsSectionComponent } from '../../components/events-section/events-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PricingSectionComponent } from '../../components/pricing-section/pricing-section.component';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';
import { CategoryService } from '../../../../core/services/category.service';
import { CourseService } from '../../../../core/services/course.service';
import { catchError, finalize, forkJoin, map, Observable, of, switchMap } from 'rxjs';

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
  private readonly router = inject(Router);
  private readonly categoryService = inject(CategoryService);
  private readonly courseService = inject(CourseService);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly events = MOCK_EVENTS;
  readonly pricingPlans = MOCK_PRICING_PLANS;

  // Real data Observables
  categories$: Observable<CategoryItem[]> = this.categoryService.getCategories().pipe(
    catchError(() => of([]))
  );

  featuredCourses$: Observable<CourseSummary[]> = this.courseService.getCourses(1, 8).pipe(
    map(res => res.courses),
    catchError(() => of([]))
  );

  // Grouped courses logic
  categoryGroups$: Observable<{ category: CategoryItem; courses: CourseSummary[] }[]> = this.categories$.pipe(
    switchMap(categories => {
      if (categories.length === 0) return of([]);
      
      // Limit to first 4 categories to keep homepage fast
      const selectedCategories = categories.slice(0, 4);
      
      const categoryCourseRequests = selectedCategories.map(cat => 
        this.courseService.getCoursesByCategory(Number(cat.id)).pipe(
          map(courses => ({ category: cat, courses: courses.slice(0, 4) })),
          catchError(() => of({ category: cat, courses: [] }))
        )
      );

      return forkJoin(categoryCourseRequests).pipe(
        map(groups => groups.filter(g => g.courses.length > 0))
      );
    })
  );

  loading = false; // Could be managed with more granularity if needed

  onSearch(q: string): void {
    void this.router.navigate(['/courses/browse'], { queryParams: { keyword: q } });
  }

  onHeaderCta(): void {
    void this.router.navigate(['/sign-up']);
  }

  onCategory(cat: CategoryItem): void {
    void this.router.navigate(['/courses'], { queryParams: { categoryId: cat.id } });
  }

  onCourse(course: CourseSummary): void {
    void this.router.navigate(['/course', course.id]);
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
