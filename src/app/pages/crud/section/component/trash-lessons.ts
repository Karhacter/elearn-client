import { Component, EventEmitter, Input, OnInit, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { Lesson, LessonService } from '@/app/core/services/lesson.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-trash-lessons',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, CheckboxModule, TagModule],
    templateUrl: './trash-lessons.html'
})
export class TrashLessonsComponent implements OnInit {
    @Input() sectionId?: number;
    @Output() onRestore = new EventEmitter<void>();

    private lessonService = inject(LessonService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    lessons = signal<Lesson[]>([]);
    selectedLessons: Lesson[] = [];
    loading = signal<boolean>(false);

    ngOnInit() {
        if (this.sectionId) {
            this.loadDeletedLessons();
        }
    }

    loadDeletedLessons() {
        if (!this.sectionId) return;

        this.loading.set(true);
        this.lessonService.getDeleted(this.sectionId).subscribe({
            next: (response: any) => {
                const payload = response?.data ?? response;
                const items = payload?.items ?? payload ?? [];

                // Map lessonId to id to ensure selection works correctly with dataKey="id"
                const mappedItems = Array.isArray(items)
                    ? items.map((l: any) => ({
                          ...l,
                          id: l.lessonId ?? l.id
                      }))
                    : [];

                this.lessons.set(mappedItems);
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load deleted lessons', life: 3000 });
                this.loading.set(false);
            }
        });
    }

    restoreLesson(lesson: Lesson) {
        if (!this.sectionId || !lesson.id) return;

        this.confirmationService.confirm({
            message: `Are you sure you want to restore lesson "<b>${lesson.title}</b>"?`,
            header: 'Confirm Restore',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-success',
            accept: () => {
                this.lessonService.bulksoftdelete(this.sectionId!, [lesson.id!], true).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Lesson restored',
                            life: 3000
                        });
                        this.loadDeletedLessons();
                        this.onRestore.emit();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to restore lesson',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    restoreSelected() {
        if (!this.sectionId || !this.selectedLessons.length) return;

        this.confirmationService.confirm({
            message: 'Are you sure you want to restore the selected lessons?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-success',
            accept: () => {
                const ids = this.selectedLessons.map((l) => l.id!).filter((id) => !!id);
                this.lessonService.bulksoftdelete(this.sectionId!, ids, true).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Selected lessons restored',
                            life: 3000
                        });
                        this.selectedLessons = [];
                        this.loadDeletedLessons();
                        this.onRestore.emit();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to restore selected lessons',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    formatDuration(duration?: number): string {
        if (!duration || duration <= 0) return '-';
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}
