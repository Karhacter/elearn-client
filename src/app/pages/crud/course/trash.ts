// Chỉ Instructor và Moderator, Admin mới có quyền truy cập
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { CourseService, CourseResponse } from '@/app/core/services/course.service';
import { Router } from '@angular/router';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-course-list',
    standalone: true,
    imports: [
        CommonModule,
        CurrencyPipe,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        TagModule,
        SelectModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        TooltipModule,
        ProgressBarModule
    ],
    templateUrl: './trash.html',
    providers: [MessageService, ConfirmationService]
})
export class CourseTrash implements OnInit {
    courses = signal<CourseResponse[]>([]);
    selectedCourses: CourseResponse[] | null = null;

    totalRecords: number = 0;
    loading: boolean = true;

    globalFilter: string = '';

    cols!: Column[];

    readonly BASE_URL = 'http://localhost:5263';

    readonly statusOptions = [
        { label: 'All', value: null },
        { label: 'Published', value: 'Published' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Archived', value: 'Archived' }
    ];

    @ViewChild('dt') dt!: Table;

    constructor(
        private courseService: CourseService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.cols = [
            { field: 'courseId', header: 'ID' },
            { field: 'title', header: 'Title' },
            { field: 'genreName', header: 'Genre' },
            { field: 'instructorName', header: 'Instructor' },
            { field: 'price', header: 'Price' },
            { field: 'status', header: 'Status' },
            { field: 'duration', header: 'Duration' }
        ];
    }

    loadCourses(event?: any) {
        this.loading = true;

        const first = event?.first ?? 0;
        const rows = event?.rows ?? 10;
        const page = Math.floor(first / rows) + 1;
        const pageSize = rows;

        this.courseService.getDeletedCourses(page, pageSize).subscribe({
            next: (response) => {
                if (response && response.data) {
                    this.courses.set(response.data.items || []);
                    this.totalRecords = response.data.totalCount || 0;
                }
                this.loading = false;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Could not fetch courses',
                    life: 3000
                });
                this.loading = false;
            }
        });
    }

    RestoreCourse(course: CourseResponse): void {
        this.confirmationService.confirm({
            message: `Are you sure you want to restore <b>${course.title}</b>?`,
            header: 'Confirm Restore',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-success',
            accept: () => {
                this.courseService.softDeleteCourse(course.courseId).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Restored',
                            detail: 'Course restored successfully',
                            life: 3000
                        });
                        this.loadCourses(this.dt);
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Could not restore course',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    RestoreSelected(): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to restore the selected courses?',
            header: 'Confirm Bulk Restore',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-success',
            accept: () => {
                const ids = (this.selectedCourses ?? []).map((c) => c.courseId);
                if (!ids.length) return;

                this.courseService.bulkSoftDeleteCourses(ids, true).subscribe({
                    next: () => {
                        this.selectedCourses = null;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Restored',
                            detail: 'Selected courses restored successfully',
                            life: 3000
                        });
                        this.loadCourses(this.dt);
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Could not restore selected courses',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    exportCSV(): void {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    /** Returns the effective price after discount */
    getEffectivePrice(course: CourseResponse): number {
        return course.price - (course.price * course.discount) / 100;
    }

    /** Formats duration in minutes to Xh Ym */
    formatDuration(minutes: number): string {
        if (!minutes) return '—';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        if (h === 0) return `${m}m`;
        if (m === 0) return `${h}h`;
        return `${h}h ${m}m`;
    }

    getThumbnailUrl(path?: string): string {
        if (!path) return 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg';
        if (path.startsWith('http')) return path;
        return `${this.BASE_URL}/${path}`;
    }

    getStatusSeverity(status?: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'success';
            case 'draft':
                return 'warn';
            case 'archived':
                return 'secondary';
            default:
                return 'info';
        }
    }

    getDiscountLabel(discount: number): string {
        return discount > 0 ? `-${discount}%` : 'No Discount';
    }
}
