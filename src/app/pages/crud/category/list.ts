import { Component, OnInit, signal, ViewChild } from '@angular/core';
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
import { CategoriesService, Category } from '@/app/core/services/categories.service';

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
    selector: 'app-crud',
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
        ConfirmDialogModule
    ],
    templateUrl: './list.html',
    providers: [MessageService, ConfirmationService]
})
export class CategoryList implements OnInit {
    categoryDialog: boolean = false;

    categories = signal<Category[]>([]);

    category: Category = {};

    selectedCategories!: Category[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
        this.loadCategories();
    }

    loadCategories() {
        this.categoriesService.getCategories().subscribe({
            next: (response) => {
                const items = response.data ? response.data : response;
                this.categories.set(Array.isArray(items) ? items : []);
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load categories', life: 3000 })
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.category = {};
        this.submitted = false;
        this.categoryDialog = true;
    }

    editCategory(category: Category) {
        this.category = { ...category };
        this.categoryDialog = true;
    }

    deleteSelectedCategories() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected categories?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (this.selectedCategories && this.selectedCategories.length > 0) {
                    const deleteRequests = this.selectedCategories.map((c) => {
                        if (c.id) return this.categoriesService.deleteCategory(c.id).toPromise();
                        return Promise.resolve();
                    });

                    Promise.all(deleteRequests)
                        .then(() => {
                            this.selectedCategories = null;
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000 });
                            this.loadCategories();
                        })
                        .catch(() => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete some categories', life: 3000 });
                            this.loadCategories();
                        });
                }
            }
        });
    }

    hideDialog() {
        this.categoryDialog = false;
        this.submitted = false;
    }

    deleteCategory(category: Category) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + category.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (category.id) {
                    this.categoriesService.deleteCategory(category.id).subscribe({
                        next: () => {
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
                            this.loadCategories();
                        },
                        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete category', life: 3000 })
                    });
                }
            }
        });
    }

    saveCategory() {
        this.submitted = true;
        if (this.category.name?.trim()) {
            if (this.category.id) {
                this.categoriesService.updateCategory(this.category).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
                        this.loadCategories();
                        this.categoryDialog = false;
                        this.category = {};
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update category', life: 3000 })
                });
            } else {
                this.categoriesService.createCategory(this.category).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
                        this.loadCategories();
                        this.categoryDialog = false;
                        this.category = {};
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create category', life: 3000 })
                });
            }
        }
    }
}
