import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Lesson } from '@/app/core/services/lesson.service';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-section-lessons-box',
    standalone: true,
    imports: [CommonModule, TableModule],
    templateUrl: './section-lessons-box.html'
})
export class SectionLessonsBoxComponent {
    @Input() lessons: Lesson[] = [];
    @Input() isLoading = false;
    selectedLessons: Lesson[] = [];

    formatDuration(duration?: number): string {
        if (!duration || duration <= 0) {
            return '-';
        }

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}
