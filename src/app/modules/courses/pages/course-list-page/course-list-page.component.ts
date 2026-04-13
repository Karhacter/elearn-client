import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../../home/data/home-mock.data';
import { MOCK_COURSE_DETAILS_LIST } from '../../data/courses-mock.data';
import { CourseListLayout, SidebarPaneLayout } from '../../models/course-catalog.model';
import { CourseListComponent } from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-course-list-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CourseListComponent],
  templateUrl: './course-list-page.component.html',
})
export class CourseListPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;
  readonly courses = MOCK_COURSE_DETAILS_LIST;

  readonly listView: CourseListLayout;
  readonly initialSidebarPane: SidebarPaneLayout;

  readonly pageTitle: string;
  readonly pageSubtitle: string;

  constructor() {
    const data = this.route.snapshot.data as { courseListView?: CourseListLayout };
    const v = data['courseListView'];
    this.listView = v === 'list' || v === 'sidebar' || v === 'grid' ? v : 'grid';

    const q = this.route.snapshot.queryParamMap;
    const pane = q.get('pane');
    this.initialSidebarPane = pane === 'list' || pane === 'grid' ? pane : 'grid';

    switch (this.listView) {
      case 'grid':
        this.pageTitle = 'Course catalog';
        this.pageSubtitle = 'Centered grid of courses—thumbnail, instructor, price, and ratings at a glance.';
        break;
      case 'list':
        this.pageTitle = 'All courses';
        this.pageSubtitle = 'Full-width rows with descriptions, lesson counts, and more context per course.';
        break;
      default:
        this.pageTitle = 'Browse courses';
        this.pageSubtitle = 'Filter by category, price, and level; switch the results pane between grid and list.';
    }
  }

  onSearch(q: string): void {
    console.debug('[courses] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[courses] newsletter', email);
  }
}
