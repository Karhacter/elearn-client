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
import { Router } from '@angular/router';
import { UserService } from '@/app/core/services/user.service';
import { passwordSecurityValidator } from '../../../core/utils/validators';

@Component({
    selector: 'app-user-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, PasswordModule, ToastModule, ProgressBarModule, CardModule, FileUploadModule, DividerModule],
    providers: [MessageService],
    templateUrl: './create.html'
})
export class UserCreate implements OnInit {
    userForm: FormGroup;
    previewUrl: string | null = null;
    selectedFile: File | null = null;
    isSubmitting = false;

    roles = [
        { name: 'ADMINISTRATOR', value: 'Admin' },
        { name: 'INSTRUCTOR', value: 'Instructor' },
        { name: 'MODERATOR', value: 'Moderator' },
        { name: 'STUDENT', value: 'Student' }
    ];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private userService: UserService
    ) {
        this.userForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            password: ['', [Validators.required, passwordSecurityValidator()]],
            role: ['Student', Validators.required]
        });
    }

    ngOnInit(): void {}

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
        if (this.userForm.valid) {
            this.isSubmitting = true;
            const userData = {
                ...this.userForm.value,
                isEmailVerified: 1
            };

            this.userService.createUser(userData).subscribe({
                next: (response) => {
                    const userId = response.data?.userId || response.data?.id;

                    if (this.selectedFile && userId) {
                        this.userService.uploadUserImage(userId, this.selectedFile).subscribe({
                            next: () => this.handleSuccess(userData.fullName),
                            error: (err) => this.handleError('User created, but image upload failed.')
                        });
                    } else {
                        this.handleSuccess(userData.fullName);
                    }
                },
                error: (err) => {
                    this.handleError(err.error?.message || 'Failed to initialize user creation.');
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
            detail: `User ${name} has been created successfully`
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
