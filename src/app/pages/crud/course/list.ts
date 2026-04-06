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
    templateUrl: './list.html',
    providers: [MessageService, ConfirmationService]
})
export class CourseList implements OnInit {
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

        // If no event is provided (manual refresh), use current table state or defaults
        const first = event?.first ?? 0;
        const rows = event?.rows ?? 10;
        const page = Math.floor(first / rows) + 1;
        const pageSize = rows;

        this.courseService.getCourses(page, pageSize).subscribe({
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

    openNew(): void {
        this.router.navigate(['/pages/crud/course/create']);
    }

    viewEdit(course: CourseResponse): void {
        this.router.navigate(['/pages/crud/course/edit', course.courseId]);
    }

    viewCourse(course: CourseResponse): void {
        this.router.navigate(['/pages/crud/course/view', course.courseId]);
    }

    softDeleteCourse(course: CourseResponse): void {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete <b>${course.title}</b>?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.courseService.softDeleteCourse(course.courseId).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Deleted',
                            detail: 'Course moved to trash',
                            life: 3000
                        });
                        this.loadCourses(this.dt); // Refresh from server to sync totals
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Could not delete course',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    deleteSelectedCourses(): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to move the selected courses to trash?',
            header: 'Confirm Bulk Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                const ids = (this.selectedCourses ?? []).map((c) => c.courseId);
                if (!ids.length) return;

                this.courseService.bulkSoftDeleteCourses(ids).subscribe({
                    next: () => {
                        this.selectedCourses = null;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Deleted',
                            detail: 'Selected courses moved to trash',
                            life: 3000
                        });
                        this.loadCourses();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Could not delete selected courses',
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
