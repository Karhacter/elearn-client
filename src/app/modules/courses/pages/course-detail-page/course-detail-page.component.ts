import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';
import { CourseService } from '../../../../core/services/course.service';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../../home/data/home-mock.data';
import { CourseDetail } from '../../models/course-catalog.model';
import { CourseDetailComponent } from '../../components/course-detail/course-detail.component';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CourseDetailComponent],
  templateUrl: './course-detail-page.component.html',
})
export class CourseDetailPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService);
  private readonly courseService = inject(CourseService);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;

  /** Observable that fetches course detail based on route parameter. */
  readonly course$: Observable<CourseDetail | null> = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id') ?? '';
      return this.courseService.getCourseById(id);
    })
  );

  readonly relatedCourses$ = this.course$.pipe(
    switchMap((course) => {
      if (!course) {
        return this.courseService.getCourses(1, 6).pipe(map((res) => res.courses.slice(0, 2)));
      }
      return this.courseService
        .getCourses(1, 8)
        .pipe(map((res) => res.courses.filter((item) => item.id !== course.id).slice(0, 2)));
    })
  );

  onSearch(q: string): void {
    console.debug('[course-detail] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[course-detail] newsletter', email);
  }

  onEnroll(c: CourseDetail): void {
    this.cart.addFromCourse(c);
    void this.router.navigate(['/cart']);
  }

  onBuyNow(c: CourseDetail): void {
    this.cart.addFromCourse(c);
    void this.router.navigate(['/checkout']);
  }

  onRelatedSelect(courseId: string): void {
    void this.router.navigate(['/course', courseId]);
  }

  backToCatalog(): void {
    void this.router.navigate(['/courses/grid']);
  }
}
