import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseSummary } from '../../models/home-ui.model';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-section.component.html',
})
export class CourseSectionComponent {
  @Input() sectionTitle = 'Find the right course';
  @Input() highlightWord = 'course';
  @Input() subtitle = 'Neon-tagged paths from zero to ship.';
  @Input() viewAllLabel = 'View all';
  @Input() courses: CourseSummary[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'No courses in this orbit yet.';

  @Output() readonly viewAll = new EventEmitter<void>();
  @Output() readonly courseClick = new EventEmitter<CourseSummary>();

  get titleParts(): { before: string; after: string } {
    const i = this.sectionTitle.indexOf(this.highlightWord);
    if (i < 0) {
      return { before: this.sectionTitle, after: '' };
    }
    return {
      before: this.sectionTitle.slice(0, i),
      after: this.sectionTitle.slice(i + this.highlightWord.length),
    };
  }

  onViewAll(): void {
    this.viewAll.emit();
  }

  onCourse(course: CourseSummary): void {
    this.courseClick.emit(course);
  }
}
