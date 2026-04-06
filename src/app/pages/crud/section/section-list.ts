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
        TooltipModule
    ],
    templateUrl: './section-list.html',
    providers: [MessageService, ConfirmationService]
})
export class SectionListDetail implements OnInit {
    private route = inject(ActivatedRoute);
    private courseService = inject(CourseService);
    private sectionService = inject(SectionService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    readonly BASE_URL = 'http://localhost:5263';

    courseId: number = 0;
    course = signal<CourseResponse | null>(null);

    sectionDialog: boolean = false;
    sections = signal<Section[]>([]);
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
                const mappedItems = Array.isArray(items) ? items.map((s: any) => ({
                    ...s,
                    id: s.sectionId || s.id // Map sectionId to id
                })) : [];
                this.sections.set(mappedItems);
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load sections', life: 3000 })
        });
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
}
