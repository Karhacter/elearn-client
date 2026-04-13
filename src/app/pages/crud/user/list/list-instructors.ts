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
import { Router } from '@angular/router';

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
    selector: 'app-user-list-instructors',
    standalone: true,
    imports: [CommonModule, TableModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, InputTextModule, DialogModule, TagModule, SelectModule, InputIconModule, IconFieldModule, ConfirmDialogModule],
    templateUrl: './list-instructors.html',
    providers: [MessageService, ConfirmationService]
})
export class UserListInstructors implements OnInit {
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
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    totalRecords: number = 0;
    loading: boolean = true;

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.cols = [
            { field: 'userId', header: 'ID' },
            { field: 'fullName', header: 'Full Name' },
            { field: 'email', header: 'Email' },
            { field: 'role', header: 'Role' },
            { field: 'phoneNumber', header: 'Phone' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    loadUsers(event?: any) {
        this.loading = true;
        const page = event && event.first !== undefined && event.rows !== undefined ? Math.floor(event.first / event.rows) + 1 : 1;
        const pageSize = event && event.rows ? event.rows : 10;

        this.userService.getInstructors(page, pageSize).subscribe({
            next: (response) => {
                if (response && response.data) {
                    this.users.set(response.data.items || []);
                    this.totalRecords = response.data.totalCount || 0;
                }
                this.loading = false;
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not fetch users', life: 3000 });
                this.loading = false;
            }
        });
    }

    openNew(): void {
        this.router.navigate(['/pages/crud/user/create'], {
            state: {
                from: 'user-list',
                timestamp: Date.now()
            }
        });
    }

    viewUser(user: User) {
        this.router.navigate(['/pages/crud/user/view', user.userId], {
            state: {
                from: 'user-list',
                timestamp: Date.now()
            }
        });
    }

    editUser(user: User) {
        this.router.navigate(['/pages/crud/user/edit', user.userId], {
            state: {
                from: 'user-list',
                timestamp: Date.now()
            }
        });
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to move the selected users to trash?',
            header: 'Confirm Bulk Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = (this.selectedUsers ?? []).map((u) => u.userId!).filter((id) => id != null);

                if (ids.length === 0) return;

                this.userService.bulkSoftDelete(ids).subscribe({
                    next: () => {
                        this.selectedUsers = null;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Selected users moved to trash', life: 3000 });
                        this.loadUsers();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not delete selected users', life: 3000 });
                    }
                });
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    softDeleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.softDeleteUser(user.userId!).subscribe({
                    next: () => {
                        this.users.set(this.users().filter((val) => val.userId !== user.userId));
                        this.user = {};
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted ( Moved To Trash )', life: 3000 });
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not delete user', life: 3000 });
                    }
                });
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

    getProfilePictureUrl(path?: string) {
        if (!path) {
            return 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
        }
        if (path.startsWith('http')) {
            return path;
        }
        return `http://localhost:5263/${path}`;
    }
}
