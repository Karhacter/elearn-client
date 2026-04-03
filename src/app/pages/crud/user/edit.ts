import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@/app/core/services/user.service';

@Component({
    selector: 'app-user-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, ToastModule, ProgressBarModule, CardModule, FileUploadModule, DividerModule],
    providers: [MessageService],
    template: `
        <div class="mb-4">
            <h4 class="m-0 font-bold">Update User</h4>
        </div>

        <p-card>
            <div class="font-semibold text-xl mb-4">User Personal Details</div>
            <p-divider />

            <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="mt-8">
                <!-- Form Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- Left Column: Primary Information -->
                    <div class="flex flex-col gap-10">
                        <div class="flex flex-col gap-3">
                            <label for="fullName" class="font-medium text-surface-900 dark:text-surface-0">Full Name</label>
                            <input pInputText id="fullName" formControlName="fullName" placeholder="Enter full name" class="p-4 text-lg w-full" [class.ng-invalid]="isFieldInvalid('fullName')" [class.ng-dirty]="isFieldInvalid('fullName')" />
                            <small class="p-error" *ngIf="isFieldInvalid('fullName')">Full Name is required.</small>
                        </div>

                        <div class="flex flex-col gap-3">
                            <label for="email" class="font-medium text-surface-900 dark:text-surface-0">Email Address</label>
                            <input pInputText id="email" formControlName="email" type="email" placeholder="example@domain.com" class="p-4 text-lg w-full" [class.ng-invalid]="isFieldInvalid('email')" [class.ng-dirty]="isFieldInvalid('email')" />
                            <small class="p-error" *ngIf="isFieldInvalid('email')">Please enter a valid email address.</small>
                        </div>

                        <div class="flex flex-col gap-3">
                            <label for="phoneNumber" class="font-medium text-surface-900 dark:text-surface-0">Phone Number</label>
                            <input
                                pInputText
                                id="phoneNumber"
                                formControlName="phoneNumber"
                                placeholder="Enter phone number"
                                class="p-4 text-lg w-full"
                                [class.ng-invalid]="isFieldInvalid('phoneNumber')"
                                [class.ng-dirty]="isFieldInvalid('phoneNumber')"
                            />
                            <small class="p-error" *ngIf="isFieldInvalid('phoneNumber')">Phone Number is required.</small>
                        </div>
                    </div>

                    <!-- Right Column: Security & Role -->
                    <div class="flex flex-col gap-10">
                        <div class="flex flex-col gap-3">
                            <label for="role" class="font-medium text-surface-900 dark:text-surface-0">System Role</label>
                            <p-select id="role" [options]="roles" formControlName="role" optionLabel="name" optionValue="value" placeholder="Select a role" styleClass="w-full p-2 text-lg" />
                            <small class="p-error" *ngIf="isFieldInvalid('role')">Role selection is required.</small>
                        </div>

                        <div class="flex flex-col gap-3">
                            <label class="font-medium text-surface-900 dark:text-surface-0">Profile Picture</label>
                            <div class="flex items-center gap-4">
                                <p-fileupload mode="basic" chooseLabel="Upload" chooseIcon="pi pi-upload" accept="image/*" maxFileSize="10000000" styleClass="p-button-outlined p-button-sm" (onSelect)="onFileSelect($event)" />

                                <div *ngIf="previewUrl" class="flex items-center gap-2">
                                    <div class="relative">
                                        <img [src]="previewUrl" class="w-12 h-12 rounded-full object-cover border border-surface-200 dark:border-surface-700" />
                                        <button type="button" class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors" (click)="removeImage()">
                                            <i class="pi pi-times text-[10px]"></i>
                                        </button>
                                    </div>
                                    <span class="text-xs text-surface-500 font-medium">Avatar updated</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="flex justify-end gap-3 mt-12 border-t border-surface-200 dark:border-surface-700 pt-8">
                    <p-button label="Cancel" severity="secondary" text (onClick)="onCancel()" />
                    <p-button label="Update" icon="pi pi-check" type="submit" [disabled]="userForm.invalid || isSubmitting" [loading]="isSubmitting" />
                </div>
            </form>
        </p-card>

        <p-toast />
    `
})
export class UserEdit implements OnInit {
    userForm: FormGroup;
    previewUrl: string | null = null;
    selectedFile: File | null = null;
    isSubmitting = false;
    userId: number | null = null;

    roles = [
        { name: 'ADMINISTRATOR', value: 'Admin' },
        { name: 'INSTRUCTOR', value: 'Instructor' },
        { name: 'STUDENT', value: 'Student' }
    ];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        this.userForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            role: ['Student', Validators.required]
        });
    }

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.userId = Number(idParam);
            this.loadUser(this.userId);
        } else {
            this.handleError('User ID not found');
            this.router.navigate(['/pages/crud/user/list']);
        }
    }

    loadUser(id: number) {
        this.userService.getUserById(id).subscribe({
            next: (response) => {
                const user = response.data;
                if (user) {
                    this.userForm.patchValue({
                        fullName: user.fullName || '',
                        email: user.email || '',
                        phoneNumber: user.phoneNumber || '',
                        role: user.role || 'Student'
                    });

                    if (user.profilePicture) {
                        this.previewUrl = `http://localhost:5263/${user.profilePicture}`;
                    }
                }
            },
            error: (err) => {
                this.handleError('Failed to load user details');
            }
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.userForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    onFileSelect(event: any) {
        const file = event.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previewUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage() {
        this.previewUrl = null;
        this.selectedFile = null;
    }

    onSubmit() {
        if (this.userForm.valid && this.userId) {
            this.isSubmitting = true;
            const userData = {
                ...this.userForm.value
            };

            this.userService.updateUser(this.userId, userData).subscribe({
                next: (response) => {
                    if (this.selectedFile) {
                        this.userService.uploadUserImage(this.userId!, this.selectedFile).subscribe({
                            next: () => this.handleSuccess(userData.fullName),
                            error: (err) => {
                                this.handleError('User updated, but image upload failed.');
                                this.handleSuccess(userData.fullName);
                            }
                        });
                    } else {
                        this.handleSuccess(userData.fullName);
                    }
                },
                error: (err) => {
                    this.handleError(err.error?.message || 'Failed to update user.');
                }
            });
        } else {
            Object.keys(this.userForm.controls).forEach((key) => {
                const control = this.userForm.get(key);
                control?.markAsTouched();
            });
        }
    }

    private handleSuccess(name: string) {
        this.isSubmitting = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${name} has been updated successfully`
        });
        setTimeout(() => this.router.navigate(['/pages/crud/user/list']), 1000);
    }

    private handleError(message: string) {
        this.isSubmitting = false;
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        });
    }

    onCancel() {
        this.router.navigate(['/pages/crud/user/list']);
    }
}
