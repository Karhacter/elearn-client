import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Lesson, LessonService } from '@/app/core/services/lesson.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-section-lessons-box',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TooltipModule, ToolbarModule],
    templateUrl: './section-lessons-box.html'
})
export class SectionLessonsBoxComponent {
    @Input() sectionId?: number;
    @Input() lessons: Lesson[] = [];
    @Input() isLoading = false;
    @Output() refreshed = new EventEmitter<number>();
    @Output() viewTrash = new EventEmitter<number>();

    private lessonService = inject(LessonService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);

    selectedLessons: Lesson[] = [];

    formatDuration(duration?: number): string {
        if (!duration || duration <= 0) {
            return '-';
        }

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    bulkSoftDeleteSelected(): void {
        if (!this.sectionId || !this.selectedLessons.length) {
            return;
        }

        this.confirmationService.confirm({
            message: 'Are you sure you want to move the selected lessons to trash?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedLessons.map((l) => l.id as number);
                this.lessonService.bulksoftdelete(this.sectionId!, ids).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Lessons moved to trash',
                            life: 3000
                        });
                        this.selectedLessons = [];
                        this.refreshed.emit(this.sectionId!);
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete lessons',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    onViewTrash(): void {
        if (this.sectionId) {
            this.viewTrash.emit(this.sectionId);
        }
    }
}
