import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CourseService, CourseResponse } from '@/app/core/services/course.service';
import { CategoriesService } from '@/app/core/services/categories.service';
import { UserService } from '@/app/core/services/user.service';

@Component({
    selector: 'app-course-edit',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Button, InputText, Select, Toast, Card, Divider, InputNumber, Textarea, ToggleSwitch, ProgressSpinner],
    providers: [MessageService],
    templateUrl: './edit.html'
})
export class CourseEdit implements OnInit {
    courseForm: FormGroup;
    courseId: number | null = null;
    loading = true;
    isSubmitting = false;
    genres: any[] = [];
    instructors: any[] = [];
    statuses = [
        { label: 'Draft', value: 0 },
        { label: 'Pending Review', value: 1 },
        { label: 'Published', value: 2 },
        { label: 'Archived', value: 3 }
    ];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private courseService: CourseService,
        private categoriesService: CategoriesService,
        private userService: UserService,
        private cdr: ChangeDetectorRef
    ) {
        this.courseForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(150)]],
            description: ['', [Validators.required, Validators.minLength(20)]],
            price: [0, [Validators.required, Validators.min(0)]],
            discount: [0, [Validators.required, Validators.min(0)]],
            genreId: [null, Validators.required],
            duration: [60, [Validators.required, Validators.min(10), Validators.max(10000)]],
            thumbnail: ['', Validators.pattern('https?://.+')],
            image: [''],
            instructorId: [null, Validators.required],
            status: [0, Validators.required],
            slug: ['', Validators.maxLength(200)],
            isSequential: [false],
            learningOutcomes: this.fb.array([]),
            requirements: this.fb.array([]),
            targetAudiences: this.fb.array([])
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
                this.courseId = Number(id);
                this.loadInitialData();
            } else {
                this.handleError('No course ID provided.');
            }
        });
    }

    private loadInitialData() {
        this.loading = true;
        // Parallel load of support data and course data
        Promise.all([this.loadGenres(), this.loadInstructors()]).then(() => {
            if (this.courseId) {
                this.loadCourse(this.courseId);
            }
        });
    }

    private loadGenres(): Promise<void> {
        return new Promise((resolve) => {
            this.categoriesService.getCategories().subscribe({
                next: (res) => {
                    this.genres = (res.data || res).map((g: any) => ({
                        label: g.name,
                        value: g.id
                    }));
                    resolve();
                },
                error: () => {
                    this.handleError('Could not fetch categories.');
                    resolve();
                }
            });
        });
    }

    private loadInstructors(): Promise<void> {
        return new Promise((resolve) => {
            this.userService.getUsers(1, 100).subscribe({
                next: (res) => {
                    const items = res.data?.items || res.items || [];
                    this.instructors = items
                        .filter((u: any) => u.role === 'Instructor' || u.role === 'Admin')
                        .map((u: any) => ({
                            label: u.fullName,
                            value: u.userId || u.id
                        }));
                    resolve();
                },
                error: () => {
                    this.handleError('Could not fetch instructors.');
                    resolve();
                }
            });
        });
    }

    private loadCourse(id: number) {
        this.courseService.getCourseById(id).subscribe({
            next: (res) => {
                if (res && res.data) {
                    this.populateForm(res.data);
                } else {
                    this.handleError('Course not found.');
                }
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.handleError(err.error?.message || 'Failed to load course details.');
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    private populateForm(course: CourseResponse) {
        // Map string status back to enum value for the dropdown if backend returns string
        let statusValue = 0;
        if (typeof course.status === 'string') {
            const statusMap: Record<string, number> = { Draft: 0, PendingReview: 1, Published: 2, Archived: 3 };
            statusValue = statusMap[course.status] ?? 0;
        } else {
            statusValue = (course.status as any) ?? 0;
        }

        this.courseForm.patchValue({
            title: course.title,
            description: course.description,
            price: course.price,
            discount: course.discount,
            genreId: course.genreId,
            duration: course.duration,
            thumbnail: course.thumbnail,
            image: course.image,
            instructorId: course.instructorId,
            status: statusValue,
            slug: course.slug,
            isSequential: course.isSequential
        });

        // Populate FormArrays
        this.setFormArray('learningOutcomes', course.learningOutcomes);
        this.setFormArray('requirements', course.requirements);
        this.setFormArray('targetAudiences', course.targetAudiences);
    }

    private setFormArray(fieldName: string, items: string[]) {
        const formArray = this.courseForm.get(fieldName) as FormArray;
        formArray.clear();
        if (items && items.length > 0) {
            items.forEach((item) => formArray.push(this.fb.control(item)));
        } else {
            formArray.push(this.fb.control(''));
        }
    }

    get learningOutcomes() {
        return this.courseForm.get('learningOutcomes') as FormArray;
    }
    get requirements() {
        return this.courseForm.get('requirements') as FormArray;
    }
    get targetAudiences() {
        return this.courseForm.get('targetAudiences') as FormArray;
    }

    addListItem(array: FormArray) {
        array.push(this.fb.control(''));
    }
    removeListItem(array: FormArray, index: number) {
        if (array.length > 1) array.removeAt(index);
        else array.at(0).setValue('');
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.courseForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    onSubmit() {
        if (this.courseForm.valid && this.courseId) {
            this.isSubmitting = true;
            const formData = this.courseForm.getRawValue();

            // Clean up empty items in lists
            formData.learningOutcomes = formData.learningOutcomes.filter((i: string) => i && i.trim());
            formData.requirements = formData.requirements.filter((i: string) => i && i.trim());
            formData.targetAudiences = formData.targetAudiences.filter((i: string) => i && i.trim());

            this.courseService.updateCourse(this.courseId, formData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Course updated successfully'
                    });
                    setTimeout(() => this.router.navigate(['/pages/crud/course/view', this.courseId]), 1000);
                },
                error: (err) => {
                    this.isSubmitting = false;
                    this.handleError(err.error?.message || 'Failed to update course.');
                    this.cdr.detectChanges();
                }
            });
        } else {
            this.markFormGroupTouched(this.courseForm);
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if ((control as any).controls) {
                this.markFormGroupTouched(control as FormGroup);
            }
        });
        this.cdr.detectChanges();
    }

    private handleError(message: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message
        });
        this.cdr.detectChanges();
    }

    onCancel() {
        this.router.navigate(['/pages/crud/course/list']);
    }
}
