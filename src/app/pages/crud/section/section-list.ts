import { Component, OnInit, signal, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SectionService, Section } from '@/app/core/services/section.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService, CourseResponse } from '@/app/core/services/course.service';
import { TooltipModule } from 'primeng/tooltip';
import { Lesson, LessonService } from '@/app/core/services/lesson.service';
import { SectionLessonsBoxComponent } from './component/section-lessons-box';
import { CreateLesson, CreateLessonPayload } from './component/create-lesson';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-section-list-detail',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        RouterLink,
        TooltipModule,
        SectionLessonsBoxComponent,
        CreateLesson
    ],
    templateUrl: './section-list.html',
    providers: [MessageService, ConfirmationService]
})
export class SectionListDetail implements OnInit {
    private route = inject(ActivatedRoute);
    private courseService = inject(CourseService);
    private sectionService = inject(SectionService);
    private lessonService = inject(LessonService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    readonly BASE_URL = 'http://localhost:5263';

    courseId: number = 0;
    course = signal<CourseResponse | null>(null);

    sectionDialog: boolean = false;
    sections = signal<Section[]>([]);
    sectionLessons = signal<Record<number, Lesson[]>>({});
    loadedSectionIds = signal<Set<number>>(new Set<number>());
    loadingSectionIds = signal<Set<number>>(new Set<number>());
    expandedSectionId: number | null = null;
    lessonDialog = false;
    activeSectionForLesson: Section | null = null;
    creatingLesson = false;
    section: Section = {};
    selectedSections!: Section[] | null;
    submitted: boolean = false;

    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];

    ngOnInit() {
        this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
        this.cols = [
            { field: 'title', header: 'Title' },
            { field: 'description', header: 'Description' },
            { field: 'order', header: 'Order' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        if (this.courseId) {
            this.loadCourseInfo();
            this.loadSections();
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Course ID', life: 3000 });
        }
    }

    loadCourseInfo() {
        this.courseService.getCourseById(this.courseId).subscribe({
            next: (response) => {
                this.course.set(response.data);
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load course information', life: 3000 })
        });
    }

    loadSections() {
        this.sectionService.getSections(this.courseId).subscribe({
            next: (response: any) => {
                const items = response.data ? response.data : response;
                const mappedItems = Array.isArray(items)
                    ? items.map((s: any) => ({
                          ...s,
                          id: s.sectionId || s.id // Map sectionId to id
                      }))
                    : [];
                this.sections.set(mappedItems);
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load sections', life: 3000 })
        });
    }

    toggleSectionLessons(section: Section): void {
        const sectionId = section.id;
        if (!sectionId) {
            return;
        }

        if (this.expandedSectionId === sectionId) {
            this.expandedSectionId = null;
            return;
        }

        this.expandedSectionId = sectionId;

        this.fetchLessons(sectionId);
    }

    openCreateLesson(section: Section): void {
        this.activeSectionForLesson = section;
        this.lessonDialog = true;
    }

    softDeleteSection(section: Section): void {
        const sectionId = section.id;
        if (!sectionId) {
            return;
        }

        this.confirmationService.confirm({
            message: `Are you sure you want to move section "${section.title ?? sectionId}" to trash?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.sectionService.softDeleteSection(this.courseId, sectionId).subscribe({
                    next: () => {
                        this.sections.update((items) => items.filter((item) => item.id !== sectionId));

                        if (this.expandedSectionId === sectionId) {
                            this.expandedSectionId = null;
                        }

                        this.sectionLessons.update((state) => {
                            const next = { ...state };
                            delete next[sectionId];
                            return next;
                        });

                        this.loadedSectionIds.update((state) => {
                            const next = new Set(state);
                            next.delete(sectionId);
                            return next;
                        });

                        this.loadingSectionIds.update((state) => {
                            const next = new Set(state);
                            next.delete(sectionId);
                            return next;
                        });

                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Section moved to trash',
                            life: 3000
                        });
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to soft delete section',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    closeCreateLessonDialog(): void {
        this.lessonDialog = false;
        this.creatingLesson = false;
        this.activeSectionForLesson = null;
    }

    createLesson(payload: CreateLessonPayload): void {
        const sectionId = this.activeSectionForLesson?.id;
        if (!sectionId) {
            return;
        }

        this.creatingLesson = true;
        this.lessonService
            .createLesson(sectionId, {
                title: payload.title,
                type: payload.type,
                contentUrl: payload.contentUrl,
                duration: payload.duration,
                order: payload.order
            })
            .subscribe({
                next: (response: any) => {
                    this.creatingLesson = false;
                    this.lessonDialog = false;
                    this.expandedSectionId = sectionId;

                    const created = this.mapLessonResponse(response?.data ?? response);
                    if (created) {
                        const current = this.sectionLessons()[sectionId] ?? [];
                        this.sectionLessons.update((state) => ({
                            ...state,
                            [sectionId]: [...current, created].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                        }));
                        this.loadedSectionIds.update((state) => {
                            const next = new Set(state);
                            next.add(sectionId);
                            return next;
                        });
                    } else {
                        this.fetchLessons(sectionId, true);
                    }

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Lesson created successfully',
                        life: 3000
                    });
                    this.activeSectionForLesson = null;
                },
                error: () => {
                    this.creatingLesson = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create lesson',
                        life: 3000
                    });
                }
            });
    }

    getLessonsBySection(sectionId?: number): Lesson[] {
        if (!sectionId) {
            return [];
        }
        return this.sectionLessons()[sectionId] ?? [];
    }

    isSectionLoading(sectionId?: number): boolean {
        return !!sectionId && this.loadingSectionIds().has(sectionId);
    }

    getExpandedSectionTitle(): string {
        const sectionId = this.expandedSectionId;
        if (!sectionId) {
            return '';
        }
        return this.sections().find((section) => section.id === sectionId)?.title ?? `Section ${sectionId}`;
    }

    private fetchLessons(sectionId: number, force = false): void {
        if (!force && (this.loadedSectionIds().has(sectionId) || this.loadingSectionIds().has(sectionId))) {
            return;
        }

        this.loadingSectionIds.update((state) => {
            const next = new Set(state);
            next.add(sectionId);
            return next;
        });

        this.lessonService.getLessons(sectionId).subscribe({
            next: (response: any) => {
                const payload = response?.data ?? response;
                const items = payload?.items ?? payload ?? [];
                const mapped = Array.isArray(items) ? items.map((lesson: any) => this.mapLessonResponse(lesson)).filter((lesson): lesson is Lesson => !!lesson) : [];

                this.sectionLessons.update((state) => ({
                    ...state,
                    [sectionId]: mapped
                }));

                this.loadedSectionIds.update((state) => {
                    const next = new Set(state);
                    next.add(sectionId);
                    return next;
                });

                this.loadingSectionIds.update((state) => {
                    const next = new Set(state);
                    next.delete(sectionId);
                    return next;
                });
            },
            error: () => {
                this.loadingSectionIds.update((state) => {
                    const next = new Set(state);
                    next.delete(sectionId);
                    return next;
                });
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load lessons',
                    life: 3000
                });
            }
        });
    }

    private mapLessonResponse(lesson: any): Lesson | null {
        if (!lesson) {
            return null;
        }

        return {
            id: lesson.lessonId ?? lesson.id,
            title: lesson.title,
            type: lesson.type,
            duration: lesson.duration,
            order: lesson.order,
            sectionId: lesson.sectionId
        };
    }

    getThumbnailUrl(path?: string): string {
        if (!path) return 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg';
        if (path.startsWith('http')) return path;
        return `${this.BASE_URL}/${path}`;
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.section = {};
        this.submitted = false;
        this.sectionDialog = true;
    }

    editSection(section: Section) {
        this.section = { ...section };
        this.sectionDialog = true;
    }

    hideDialog() {
        this.sectionDialog = false;
        this.submitted = false;
    }

    saveSection() {
        this.submitted = true;
        if (this.section.title?.trim()) {
            if (this.section.id) {
                this.sectionService.updateSection(this.courseId, this.section).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Section Updated', life: 3000 });
                        this.loadSections();
                        this.sectionDialog = false;
                        this.section = {};
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update section', life: 3000 })
                });
            } else {
                this.sectionService.createSection(this.courseId, this.section).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Section Created', life: 3000 });
                        this.loadSections();
                        this.sectionDialog = false;
                        this.section = {};
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create section', life: 3000 })
                });
            }
        }
    }

    deleteSelectedSections() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected sections?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedSections!.map((s) => s.id as number);
                this.sectionService.bulkSoftDeleteSections(this.courseId, ids).subscribe({
                    next: () => {
                        this.sections.set(this.sections().filter((val) => !this.selectedSections?.includes(val)));
                        this.selectedSections = null;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Sections Deleted',
                            life: 3000
                        });
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete sections',
                            life: 3000
                        });
                    }
                });
            }
        });
    }
}
