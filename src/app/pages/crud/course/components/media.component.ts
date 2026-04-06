import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Image } from 'primeng/image';
import { CourseResponse } from '@/app/core/services/course.service';

@Component({
    selector: 'app-course-media',
    standalone: true,
    imports: [CommonModule, Card, Image],
    templateUrl: './media.html'
})
export class CourseMediaComponent {
    @Input() course!: CourseResponse;

    readonly BASE_URL = 'http://localhost:5263';

    getThumbnailUrl(path?: string): string {
        if (!path) return 'assets/demo/images/placeholder.jpg';
        if (path.startsWith('http')) return path;
        return `${this.BASE_URL}/${path}`;
    }

    getCourseImageUrl(path?: string): string {
        if (!path) return 'assets/demo/images/placeholder.jpg';
        if (path.startsWith('http')) return path;
        return `${this.BASE_URL}/${path}`;
    }
}
