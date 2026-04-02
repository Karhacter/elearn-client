import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService, User } from '@/app/core/services/user.service';

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
    selector: 'app-user-list',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        DialogModule,
        TagModule,
        SelectModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedUsers()" [disabled]="!selectedUsers || !selectedUsers.length" />
            </ng-template>

            <ng-template #end>
                <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="users()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['fullName', 'email', 'role', 'phoneNumber']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedUsers"
            [rowHover]="true"
            dataKey="userId"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Users</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th pSortableColumn="userId" style="min-width: 8rem">
                        ID <p-sortIcon field="userId" />
                    </th>
                    <th>Avatar</th>
                    <th pSortableColumn="fullName" style="min-width:16rem">
                        Full Name <p-sortIcon field="fullName" />
                    </th>
                    <th pSortableColumn="email" style="min-width: 16rem">
                        Email <p-sortIcon field="email" />
                    </th>
                    <th pSortableColumn="phoneNumber" style="min-width:12rem">
                        Phone <p-sortIcon field="phoneNumber" />
                    </th>
                    <th pSortableColumn="role" style="min-width: 12rem">
                        Role <p-sortIcon field="role" />
                    </th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-user>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="user" />
                    </td>
                    <td>{{ user.userId }}</td>
                    <td>
                        <img [src]="user.profilePicture || 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png'" [alt]="user.fullName" style="width: 32px; height: 32px; object-fit: cover;" class="rounded-full" />
                    </td>
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phoneNumber || 'N/A' }}</td>
                    <td>
                        <p-tag [value]="user.role" [severity]="getRoleSeverity(user.role)" />
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editUser(user)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteUser(user)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="userDialog" [style]="{ width: '450px' }" header="User Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <img [src]="user.profilePicture || 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png'" [alt]="user.fullName" class="block m-auto pb-4 rounded-full" *ngIf="user.profilePicture || user.userId" style="width: 80px; height: 80px; object-fit: cover;"/>
                    
                    <div>
                        <label for="fullName" class="block font-bold mb-3">Full Name</label>
                        <input type="text" pInputText id="fullName" [(ngModel)]="user.fullName" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !user.fullName">Full Name is required.</small>
                    </div>

                    <div>
                        <label for="email" class="block font-bold mb-3">Email</label>
                        <input type="email" pInputText id="email" [(ngModel)]="user.email" required fluid />
                        <small class="text-red-500" *ngIf="submitted && !user.email">Email is required.</small>
                    </div>

                    <div>
                        <label for="phoneNumber" class="block font-bold mb-3">Phone Number</label>
                        <input type="text" pInputText id="phoneNumber" [(ngModel)]="user.phoneNumber" fluid />
                    </div>

                    <div>
                        <label for="role" class="block font-bold mb-3">Role</label>
                        <p-select [(ngModel)]="user.role" inputId="role" [options]="roles" optionLabel="label" optionValue="value" placeholder="Select a Role" fluid />
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Save" icon="pi pi-check" (click)="saveUser()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, ConfirmationService]
})
export class UserList implements OnInit {
    userDialog: boolean = false;

    users = signal<User[]>([]);

    user: User = {};

    selectedUsers!: User[] | null;

    submitted: boolean = false;

    roles: any[] = [
        { label: 'Admin', value: 'Admin' },
        { label: 'Instructor', value: 'Instructor' },
        { label: 'Moderator', value: 'Moderator' },
        { label: 'Student', value: 'Student' }
    ];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadUsers();

        this.cols = [
            { field: 'userId', header: 'ID' },
            { field: 'fullName', header: 'Full Name' },
            { field: 'email', header: 'Email' },
            { field: 'role', header: 'Role' },
            { field: 'phoneNumber', header: 'Phone' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    loadUsers() {
        this.userService.getUsers().subscribe({
            next: (response) => {
                if (response && response.data) {
                    this.users.set(response.data);
                }
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not fetch users', life: 3000 });
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.set(this.users().filter((val) => !this.selectedUsers?.includes(val)));
                this.selectedUsers = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted (Local Only)', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.set(this.users().filter((val) => val.userId !== user.userId));
                this.user = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted (Local Only)', life: 3000 });
            }
        });
    }

    getRoleSeverity(role?: string) {
        switch (role?.toUpperCase()) {
            case 'ADMIN':
                return 'danger';
            case 'INSTRUCTOR':
                return 'warn';
            case 'MODERATOR':
                return 'info';
            case 'STUDENT':
                return 'success';
            default:
                return 'secondary';
        }
    }

    saveUser() {
        this.submitted = true;
        let _users = this.users();
        if (this.user.fullName?.trim() && this.user.email?.trim()) {
            if (this.user.userId) {
                const index = _users.findIndex((u) => u.userId === this.user.userId);
                if (index !== -1) {
                    _users[index] = this.user;
                }
                this.users.set([..._users]);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated (Local Only)', life: 3000 });
            } else {
                this.user.userId = Math.floor(Math.random() * 1000) + 1; // Temporary mock id
                this.users.set([..._users, this.user]);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created (Local Only)', life: 3000 });
            }

            this.userDialog = false;
            this.user = {};
        }
    }
}
