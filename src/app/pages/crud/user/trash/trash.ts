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
    selector: 'app-user-trash',
    standalone: true,
    imports: [CommonModule, TableModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, InputTextModule, DialogModule, TagModule, SelectModule, InputIconModule, IconFieldModule, ConfirmDialogModule],
    templateUrl: './trash.html',
    providers: [MessageService, ConfirmationService]
})
export class UserTrash implements OnInit {
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
        this.userService.getDeletedUsers().subscribe({
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

    restoreUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to restore ' + user.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.softDeleteUser(user.userId!).subscribe({
                    next: () => {
                        this.users.set(this.users().filter((val) => val.userId !== user.userId));
                        this.user = {};
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Restored', life: 3000 });
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not delete user', life: 3000 });
                    }
                });
            }
        });
    }

    restoreSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to restore the selected users?',
            header: 'Confirm Bulk Restore',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const toRestore = [...(this.selectedUsers ?? [])];
                if (toRestore.length === 0) return;

                let completed = 0;
                let hasError = false;

                toRestore.forEach((user) => {
                    this.userService.softDeleteUser(user.userId!).subscribe({
                        next: () => {
                            completed++;
                            if (completed === toRestore.length) {
                                this.users.set(this.users().filter((val) => !toRestore.includes(val)));
                                this.selectedUsers = null;
                                const msg = hasError ? 'Some users could not be restored' : 'Selected users restored successfully';
                                this.messageService.add({ severity: hasError ? 'warn' : 'success', summary: hasError ? 'Partial' : 'Successful', detail: msg, life: 3000 });
                            }
                        },
                        error: () => {
                            hasError = true;
                            completed++;
                            if (completed === toRestore.length) {
                                this.loadUsers();
                                this.selectedUsers = null;
                                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not restore selected users', life: 3000 });
                            }
                        }
                    });
                });
            }
        });
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to permanently delete the selected users?',
            header: 'Confirm Bulk Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = (this.selectedUsers ?? []).map((u) => u.userId!).filter((id) => id != null);

                if (ids.length === 0) return;

                this.userService.bulkSoftDelete(ids).subscribe({
                    next: () => {
                        this.users.set(this.users().filter((val) => !this.selectedUsers?.includes(val)));
                        this.selectedUsers = null;
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Selected users deleted', life: 3000 });
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

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete forever  ' + user.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.deleteUser(user.userId!).subscribe({
                    next: () => {
                        this.users.set(this.users().filter((val) => val.userId !== user.userId));
                        this.user = {};
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Removed', life: 3000 });
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
        return `http://localhost:5263/${path}`;
    }
}
