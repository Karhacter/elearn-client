import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { CourseResponse } from '@/app/core/services/course.service';

@Component({
    selector: 'app-course-curriculum',
    standalone: true,
    imports: [CommonModule, Card],
    templateUrl: './curriculum.html'
})
export class CourseCurriculumComponent {
    @Input() course!: CourseResponse;

    get hasOutcomes(): boolean { return !!this.course.learningOutcomes?.length; }
    get hasRequirements(): boolean { return !!this.course.requirements?.length; }
    get hasAudiences(): boolean { return !!this.course.targetAudiences?.length; }
}
