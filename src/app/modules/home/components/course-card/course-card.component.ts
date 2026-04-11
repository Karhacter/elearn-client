import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseSummary } from '../../models/home-ui.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  @Input() course?: CourseSummary;
  @Input() showPrice = true;
  @Input() loading = false;

  @Output() readonly selected = new EventEmitter<CourseSummary>();

  badgeClass: Record<CourseSummary['categoryTone'], string> = {
    cyan:
      'border-blue-200 bg-blue-50 text-blue-800 dark:border-cyan-400/50 dark:bg-cyan-500/20 dark:text-cyan-200 dark:shadow-[0_0_12px_rgba(34,211,238,0.35)]',
    purple:
      'border-violet-200 bg-violet-50 text-violet-800 dark:border-fuchsia-400/50 dark:bg-fuchsia-600/20 dark:text-fuchsia-200 dark:shadow-[0_0_12px_rgba(217,70,239,0.35)]',
    pink:
      'border-pink-200 bg-pink-50 text-pink-800 dark:border-pink-400/50 dark:bg-pink-500/20 dark:text-pink-200 dark:shadow-[0_0_12px_rgba(244,114,182,0.35)]',
    green:
      'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/50 dark:bg-emerald-500/20 dark:text-emerald-200 dark:shadow-[0_0_12px_rgba(52,211,153,0.35)]',
    orange:
      'border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-400/50 dark:bg-orange-500/20 dark:text-orange-200 dark:shadow-[0_0_12px_rgba(251,146,60,0.35)]',
  };

  onCardClick(): void {
    if (!this.loading && this.course) {
      this.selected.emit(this.course);
    }
  }
}
