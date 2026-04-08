import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Lesson {
    id?: number;
    title?: string;
    type?: string;
    duration?: number;
    contentUrl?: string;
    order?: number;
    sectionId?: number;
}

@Injectable({
    providedIn: 'root'
})
export class LessonService {
    private http = inject(HttpClient);
    private courseUrl = 'http://localhost:5263/api';

    getLessons(sectionId: number, page: number = 1, pageSize: number = 100): Observable<any> {
        return this.http.get<any>(`${this.courseUrl}/sections/${sectionId}/lessons?page=${page}&pageSize=${pageSize}`, {
            withCredentials: true
        });
    }

    createLesson(sectionId: number, lesson: Lesson): Observable<any> {
        return this.http.post<any>(`${this.courseUrl}/sections/${sectionId}/lessons`, lesson, {
            withCredentials: true
        });
    }

    updateLesson(lessonId: number, lesson: Lesson): Observable<any> {
        return this.http.put<any>(`${this.courseUrl}/lessons/${lessonId}`, lesson, {
            withCredentials: true
        });
    }

    deleteLesson(lessonId: number): Observable<any> {
        return this.http.delete<any>(`${this.courseUrl}/lessons/${lessonId}`, {
            withCredentials: true
        });
    }
}
