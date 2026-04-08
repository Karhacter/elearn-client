import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

type LessonType = 'Video' | 'Quiz' | 'Article';
export interface CreateLessonPayload {
    title: string;
    type: LessonType;
    contentUrl?: string;
    duration: number;
    order?: number;
}

@Component({
    selector: 'app-create-lesson',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Card, InputText, Select, InputNumber, Button],
    templateUrl: './create-lesson.html'
})
export class CreateLesson {
    @Output() createLesson = new EventEmitter<CreateLessonPayload>();
    @Output() cancel = new EventEmitter<void>();
    @Input() submitting = false;

    readonly lessonTypes: Array<{ label: string; value: LessonType }> = [
        { label: 'Video', value: 'Video' },
        { label: 'Quiz', value: 'Quiz' },
        { label: 'Article', value: 'Article' }
    ];

    readonly lessonForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.lessonForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(100)]],
            type: ['Video', [Validators.required]],
            contentUrl: ['', [this.urlIfProvidedValidator()]],
            duration: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
            order: [null]
        });
    }

    submit(): void {
        if (this.lessonForm.invalid) {
            this.lessonForm.markAllAsTouched();
            return;
        }

        const payload = this.lessonForm.getRawValue() as CreateLessonPayload;
        this.createLesson.emit({
            ...payload,
            contentUrl: payload.contentUrl?.trim() || undefined
        });
    }

    reset(): void {
        this.lessonForm.reset({
            title: '',
            type: 'Video',
            contentUrl: '',
            duration: null,
            order: null
        });
    }

    isInvalid(field: string): boolean {
        const control = this.lessonForm.get(field);
        return !!control && control.invalid && (control.touched || control.dirty);
    }

    private urlIfProvidedValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = (control.value ?? '').toString().trim();
            if (!value) {
                return null;
            }

            try {
                // Validate absolute URL format.
                // eslint-disable-next-line no-new
                new URL(value);
                return null;
            } catch {
                return { invalidUrl: true };
            }
        };
    }
}
