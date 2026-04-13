import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseCatalogItem, CourseDetail } from '../../models/course-catalog.model';

type DetailTab = 'description' | 'curriculum' | 'reviews' | 'members';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent {
  @Input() course: CourseDetail | null = null;
  @Input() relatedCourses: CourseCatalogItem[] = [];

  @Output() readonly enroll = new EventEmitter<CourseDetail>();
  @Output() readonly buyNow = new EventEmitter<CourseDetail>();
  @Output() readonly relatedSelect = new EventEmitter<string>();

  activeTab: DetailTab = 'description';

  readonly tabs: { id: DetailTab; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'members', label: 'Members' },
  ];

  onEnroll(): void {
    if (this.course) {
      this.enroll.emit(this.course);
    }
  }

  onBuyNow(): void {
    if (this.course) {
      this.buyNow.emit(this.course);
    }
  }

  stars(n: number): number[] {
    return Array.from({ length: Math.round(n) }, (_, i) => i);
  }

  setTab(tab: DetailTab): void {
    this.activeTab = tab;
  }

  isActiveTab(tab: DetailTab): boolean {
    return this.activeTab === tab;
  }

  onRelatedSelect(courseId: string): void {
    this.relatedSelect.emit(courseId);
  }
}
