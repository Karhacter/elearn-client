import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
import { DatePickerModule } from 'primeng/datepicker';
import { Router } from '@angular/router';
import { UserService } from '@/app/core/services/user.service';
import { passwordSecurityValidator } from '../../../core/utils/validators';

// ------------------------------------------------------------------
// Validator: birthday must be strictly in the past
// ------------------------------------------------------------------
function pastDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selected = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected < today ? null : { notInPast: true };
}

@Component({
    selector: 'app-user-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, SelectModule, PasswordModule, ToastModule, ProgressBarModule, CardModule, FileUploadModule, DividerModule, DatePickerModule],
    providers: [MessageService],
    templateUrl: './create.html'
})
export class UserCreate implements OnInit {
    userForm: FormGroup;
    previewUrl: string | null = null;
    selectedFile: File | null = null;
    isSubmitting = false;
    maxBirthday: Date = new Date();

    roles = [
        { name: 'ADMINISTRATOR', value: 'Admin' },
        { name: 'INSTRUCTOR', value: 'Instructor' },
        { name: 'STUDENT', value: 'Student' }
    ];

    genders = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Prefer Not To Say', value: 'PreferNotToSay' }
    ];

    // ------------------------------------------------------------------
    // Mock location data
    // ------------------------------------------------------------------
    private locationData: Record<string, { code: string; name: string }[]> = {
        VN: [
            { code: 'HCM', name: 'Ho Chi Minh' },
            { code: 'HN', name: 'Hanoi' }
        ],
        US: [
            { code: 'NY', name: 'New York' },
            { code: 'LA', name: 'Los Angeles' }
        ]
    };

    countries = [
        { code: 'VN', name: 'Vietnam' },
        { code: 'US', name: 'United States' }
    ];

    cities: { code: string; name: string }[] = [];

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router,
        private userService: UserService,
        private location: Location
    ) {
        this.userForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            password: ['', [Validators.required, passwordSecurityValidator()]],
            role: ['Student', Validators.required],
            gender: ['', Validators.required],
            birthday: [null, [Validators.required, pastDateValidator]],
            country: [null, Validators.required],
            city: [{ value: null, disabled: true }, Validators.required],
            street: ['']
        });
    }

    ngOnInit(): void {
        // React to country selection changes
        this.userForm.get('country')!.valueChanges.subscribe((country) => {
            const cityCtrl = this.userForm.get('city')!;
            cityCtrl.setValue(null);
            if (country) {
                this.cities = this.locationData[country.code] ?? [];
                cityCtrl.enable();
            } else {
                this.cities = [];
                cityCtrl.disable();
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
        if (this.userForm.valid) {
            this.isSubmitting = true;

            const raw = this.userForm.getRawValue();
            const userData = {
                fullName: raw.fullName,
                email: raw.email,
                phoneNumber: raw.phoneNumber,
                password: raw.password,
                role: raw.role,
                gender: raw.gender,
                birthday: raw.birthday ? (raw.birthday as Date).toISOString().split('T')[0] : null,
                countryCode: raw.country?.code ?? null,
                countryName: raw.country?.name ?? null,
                cityCode: raw.city?.code ?? null,
                cityName: raw.city?.name ?? null,
                street: raw.street,
                isEmailVerified: 1
            };

            this.userService.createUser(userData).subscribe({
                next: (response) => {
                    const userId = response.data?.userId || response.data?.id;

                    if (this.selectedFile && userId) {
                        this.userService.uploadUserImage(userId, this.selectedFile).subscribe({
                            next: () => this.handleSuccess(userData.fullName),
                            error: () => this.handleError('User created, but image upload failed.')
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
                this.userForm.get(key)?.markAsTouched();
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
        setTimeout(() => this.location.back(), 1000);
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
        this.location.back();
    }
}
