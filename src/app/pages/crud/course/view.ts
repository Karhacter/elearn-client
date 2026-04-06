import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService, CourseResponse } from '@/app/core/services/course.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Button } from 'primeng/button';
import { CourseDetailsComponent } from './components/details.component';
import { CourseCurriculumComponent } from './components/curriculum.component';
import { CourseMediaComponent } from './components/media.component';

@Component({
    selector: 'app-course-view',
    standalone: true,
    imports: [
        CommonModule,
        Toast,
        ProgressSpinner,
        Button,
        CourseDetailsComponent,
        CourseCurriculumComponent,
        CourseMediaComponent
    ],
    providers: [MessageService],
    templateUrl: './view.html'
})
export class CourseView implements OnInit {
    course: CourseResponse | null = null;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseService: CourseService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
                this.loadCourse(id);
            } else {
                this.handleError('No course ID provided.');
            }
        });
    }

    loadCourse(id: number) {
        this.loading = true;
        this.courseService.getCourseById(id).subscribe({
            next: (res) => {
                if (res && res.data) {
                    this.course = res.data;
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

    onBack() {
        this.router.navigate(['/pages/crud/course/list']);
    }

    onEdit() {
        if (this.course) {
            this.router.navigate(['/pages/crud/course/edit', this.course.courseId]);
        }
    }

    private handleError(message: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 5000
        });
    }
}
