import { Component, OnInit, signal, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SectionService, Section } from '@/app/core/services/section.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-section-trash',
    standalone: true,
    imports: [CommonModule, TableModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, InputTextModule, TagModule, InputIconModule, IconFieldModule, ConfirmDialogModule, RouterLink, TooltipModule],
    templateUrl: './trash.html',
    providers: [MessageService, ConfirmationService]
})
export class SectionTrash implements OnInit {
    private route = inject(ActivatedRoute);
    private sectionService = inject(SectionService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);

    courseId: number = 0;
    sections = signal<Section[]>([]);
    selectedSections!: Section[] | null;
    loading = signal<boolean>(false);

    @ViewChild('dt') dt!: Table;
    cols!: Column[];

    ngOnInit() {
        this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
        this.cols = [
            { field: 'title', header: 'Title' },
            { field: 'description', header: 'Description' },
            { field: 'order', header: 'Order' }
        ];

        if (this.courseId) {
            this.loadDeletedSections();
        }
    }

    loadDeletedSections() {
        this.loading.set(true);
        this.sectionService.getDeleted(this.courseId).subscribe({
            next: (response: any) => {
                const items = response.data ? response.data : response;
                const mappedItems = Array.isArray(items)
                    ? items.map((s: any) => ({
                          ...s,
                          id: s.sectionId || s.id
                      }))
                    : [];
                this.sections.set(mappedItems);
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load deleted sections', life: 3000 });
                this.loading.set(false);
            }
        });
    }

    restoreSection(section: Section) {
        this.confirmationService.confirm({
            message: `Are you sure you want to restore <b>${section.title}</b>?`,
            header: 'Confirm Restore',
            icon: 'pi pi-exclamation-triangle',
            acceptButtonStyleClass: 'p-button-success',
            accept: () => {
                this.sectionService.softDeleteSection(this.courseId, section.id as number).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Section Restored',
                            life: 3000
                        });
                        this.loadDeletedSections();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to restore section',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    restoreSelected() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to restore the selected sections?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedSections!.map((s) => s.id as number);
                if (!ids.length) return;

                this.sectionService.bulkSoftDeleteSections(this.courseId, ids, true).subscribe({
                    next: () => {
                        this.sections.set(this.sections().filter((val) => !this.selectedSections?.includes(val)));
                        this.selectedSections = null;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Sections Restored',
                            life: 3000
                        });
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to restore sections',
                            life: 3000
                        });
                    }
                });
            }
        });
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
