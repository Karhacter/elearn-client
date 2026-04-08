import { Component, OnInit, signal, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CourseService, CourseResponse } from '@/app/core/services/course.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-section-list',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, TagModule, AvatarModule, InputIconModule, IconFieldModule],
    templateUrl: './list.html',
    providers: [MessageService]
})
export class SectionList implements OnInit {
    // Khai báo biến cục bộ
    private router = inject(Router);
    private courseService = inject(CourseService);
    private messageService = inject(MessageService);

    readonly BASE_URL = 'http://localhost:5263';

    allCourses = signal<CourseResponse[]>([]);
    loading = signal<boolean>(false);

    ngOnInit() {
        this.loadAllCourses();
    }

    loadAllCourses() {
        this.loading.set(true);
        this.courseService.getCourses(1, 100).subscribe({
            next: (response) => {
                this.allCourses.set(response.data.items || []);
                this.loading.set(false);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load courses', life: 3000 });
                this.loading.set(false);
            }
        });
    }

    onCourseSelect(id: number) {
        this.router.navigate(['/pages/components/course', id, 'section', 'list']);
    }

    getThumbnailUrl(path?: string): string {
        if (!path) return 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg';
        if (path.startsWith('http')) return path;
        return `${this.BASE_URL}/${path}`;
    }
}
