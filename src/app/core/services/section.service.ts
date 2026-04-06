import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Section {
    id?: number;
    title?: string;
    description?: string;
    order?: number;
}

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    private http = inject(HttpClient);
    private courseUrl = 'http://localhost:5263/api/course';
    private authService = inject(AuthService);

    private getHeaders(): HttpHeaders {
        const token = this.authService.getCookie('accessToken');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    getSections(courseId: number): Observable<any> {
        return this.http.get<any>(`${this.courseUrl}/${courseId}/sections`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    createSection(courseId: number, section: Section): Observable<any> {
        return this.http.post<any>(`${this.courseUrl}/${courseId}/sections`, section, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    updateSection(courseId: number, section: Section): Observable<any> {
        return this.http.put<any>(`${this.courseUrl}/${courseId}/sections/${section.id}`, section, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }
}
