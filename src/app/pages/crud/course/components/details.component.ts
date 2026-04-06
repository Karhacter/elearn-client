import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Divider } from 'primeng/divider';
import { Card } from 'primeng/card';
import { CourseResponse } from '@/app/core/services/course.service';

@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [CommonModule, Button, Tag, Divider, Card],
    templateUrl: './details.html'
})
export class CourseDetailsComponent {
    @Input() course!: CourseResponse;
    @Output() back = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();

    getStatusSeverity(status?: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'success';
            case 'draft':
                return 'warn';
            case 'pendingreview':
                return 'info';
            case 'archived':
                return 'secondary';
            default:
                return 'info';
        }
    }

    getStatusLabel(status?: string): string {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'Published';
            case 'draft':
                return 'Draft';
            case 'pendingreview':
                return 'Pending Review';
            case 'archived':
                return 'Archived';
            default:
                return status || 'Unknown';
        }
    }

    formatDuration(minutes: number): string {
        if (!minutes) return '—';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        if (h === 0) return `${m}m`;
        if (m === 0) return `${h}h`;
        return `${h}h ${m}m`;
    }
}
