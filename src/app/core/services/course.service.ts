import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface CourseResponse {
    courseId: number;
    title?: string;
    description?: string;
    slug?: string;
    status?: string;
    isSequential: boolean;
    price: number;
    discount: number;
    genreId: number;
    genreName?: string;
    image?: string;
    thumbnail?: string;
    duration: number;
    instructorId: number;
    instructorName?: string;
    learningOutcomes: string[];
    requirements: string[];
    targetAudiences: string[];
}

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success?: boolean;
}

// Keep the old Course alias for backward compatibility
export type Course = CourseResponse;

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private courseUrl = 'http://localhost:5263/api/Course';

    private getHeaders(): HttpHeaders {
        const token = this.authService.getCookie('accessToken');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    getCourses(page: number = 1, pageSize: number = 10): Observable<ApiResponse<PagedResult<CourseResponse>>> {
        const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
        return this.http.get<ApiResponse<PagedResult<CourseResponse>>>(this.courseUrl, {
            headers: this.getHeaders(),
            params,
            withCredentials: true
        });
    }

    getDeletedCourses(page: number = 1, pageSize: number = 10): Observable<ApiResponse<PagedResult<CourseResponse>>> {
        const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
        return this.http.get<ApiResponse<PagedResult<CourseResponse>>>(`${this.courseUrl}/deleted`, {
            headers: this.getHeaders(),
            params,
            withCredentials: true
        });
    }

    getCourseById(id: number): Observable<ApiResponse<CourseResponse>> {
        return this.http.get<ApiResponse<CourseResponse>>(`${this.courseUrl}/detail/${id}`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    softDeleteCourse(id: number): Observable<any> {
        return this.http.patch<any>(
            `${this.courseUrl}/${id}/toggle-soft-delete`,
            {},
            {
                headers: this.getHeaders(),
                withCredentials: true
            }
        );
    }

    bulkSoftDeleteCourses(ids: number[], restore: boolean = false): Observable<any> {
        return this.http.post<any>(
            `${this.courseUrl}/bulk-soft-delete`,
            { ids, restore },
            {
                headers: this.getHeaders(),
                withCredentials: true
            }
        );
    }

    createCourse(course: any): Observable<any> {
        return this.http.post<any>(`${this.courseUrl}/add`, course, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    updateCourse(id: number, course: any): Observable<any> {
        return this.http.put<any>(`${this.courseUrl}/edit/${id}`, course, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }
}
