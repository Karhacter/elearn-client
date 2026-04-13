import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { delay, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CourseCardComponent } from '../../../home/components/course-card/course-card.component';
import { CategoryItem, CourseSummary } from '../../../home/models/home-ui.model';
import {
  CourseCatalogItem,
  CourseListLayout,
  CourseLevel,
  SidebarPaneLayout,
} from '../../models/course-catalog.model';
import { CourseService, PaginatedCourses } from '../../../../core/services/course.service';

type PriceFilter = 'all' | 'lt50' | '50to99' | 'gte100';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly scroller = inject(ViewportScroller);

  readonly priceOptions: { id: PriceFilter; label: string }[] = [
    { id: 'all', label: 'Any price' },
    { id: 'lt50', label: 'Under $50' },
    { id: '50to99', label: '$50 – $99' },
    { id: 'gte100', label: '$100+' },
  ];

  readonly levelOptions: { id: CourseLevel | 'all'; label: string }[] = [
    { id: 'all', label: 'All levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];

  @Input() categories: CategoryItem[] = [];

  @Input() set layout(value: CourseListLayout | null | undefined) {
    if (value === 'grid' || value === 'list' || value === 'sidebar') {
      this._layout = value;
    }
  }
  get layout(): CourseListLayout {
    return this._layout;
  }
  private _layout: CourseListLayout = 'grid';

  @Input() set sidebarPaneLayout(value: SidebarPaneLayout | null | undefined) {
    if (value === 'grid' || value === 'list') {
      this._sidebarPaneLayout = value;
    }
  }
  get sidebarPaneLayout(): SidebarPaneLayout {
    return this._sidebarPaneLayout;
  }
  private _sidebarPaneLayout: SidebarPaneLayout = 'grid';

  categoryId: string | 'all' = 'all';
  priceRange: PriceFilter = 'all';
  level: CourseLevel | 'all' = 'all';

  // Pagination state
  currentPage = 1;
  pageSize = 12;

  private filtersSubject = new BehaviorSubject({
    categoryId: 'all',
    priceRange: 'all' as PriceFilter,
    level: 'all' as CourseLevel | 'all',
  });

  private pageSubject = new BehaviorSubject<number>(1);

  /** Primary data stream for the UI. */
  paginatedData$!: Observable<PaginatedCourses>;
  /** Filtered courses based on current page results and sidebar filters. */
  filteredCourses$!: Observable<CourseCatalogItem[]>;

  ngOnInit() {
    // 1. Fetch paginated data from service
    this.paginatedData$ = this.pageSubject.pipe(
      // Add a small deliberate delay to show loading state (prevents 'The Flash' effect)
      // and ensures the scroll reset is visible to the user.
      switchMap(page => this.courseService.getCourses(page, this.pageSize).pipe(
        delay(300) 
      )),
      shareReplay(1)
    );

    // 2. Derive filtered courses from the current page of data
    // (Filtering is done client-side on the current page for now)
    this.filteredCourses$ = combineLatest([this.paginatedData$, this.filtersSubject]).pipe(
      map(([data, filters]) => data.courses.filter((c) => this.matchesFilters(c, filters))),
    );
  }

  setSidebarPane(mode: SidebarPaneLayout): void {
    this._sidebarPaneLayout = mode;
  }

  selectCategory(id: string | 'all'): void {
    this.categoryId = id;
    this.updateFilters();
  }

  setPriceRange(r: PriceFilter): void {
    this.priceRange = r;
    this.updateFilters();
  }

  setLevel(l: CourseLevel | 'all'): void {
    this.level = l;
    this.updateFilters();
  }

  private updateFilters(): void {
    this.filtersSubject.next({
      categoryId: this.categoryId,
      priceRange: this.priceRange,
      level: this.level,
    });
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page < 1 || page === this.currentPage) return;
    this.currentPage = page;
    this.pageSubject.next(page);

    // Scroll to the top of the results section specifically
    setTimeout(() => {
      const topElement = document.getElementById('catalog-top');
      if (topElement) {
        topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  }

  nextPage(totalPages: number): void {
    if (this.currentPage < totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  /** Calculate which page numbers to show in the pagination bar. */
  getPageRange(current: number, total: number): number[] {
    const range: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  levelLabel(c: CourseCatalogItem): string {
    const map: Record<CourseLevel, string> = {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    };
    return map[c.level] || 'All levels';
  }

  onSelect(course: CourseSummary): void {
    void this.router.navigate(['/course', course.id]);
  }

  paneTabClasses(isActive: boolean): string {
    return isActive
      ? 'bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white'
      : 'text-slate-600 dark:text-slate-400';
  }

  filterOptionClasses(isActive: boolean): string {
    return isActive
      ? 'bg-blue-50 text-blue-800 dark:bg-white/10 dark:text-cyan-200'
      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5';
  }

  private matchesFilters(c: CourseCatalogItem, filters: any): boolean {
    if (filters.categoryId !== 'all' && c.categoryId !== filters.categoryId) {
      return false;
    }
    if (filters.level !== 'all' && c.level !== filters.level) {
      return false;
    }
    switch (filters.priceRange) {
      case 'lt50':
        return c.price < 50;
      case '50to99':
        return c.price >= 50 && c.price < 100;
      case 'gte100':
        return c.price >= 100;
      default:
        return true;
    }
  }
}
