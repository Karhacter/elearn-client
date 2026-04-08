import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    private courseUrl = 'http://localhost:5263/api/Course';

    getCourses(page: number = 1, pageSize: number = 10): Observable<ApiResponse<PagedResult<CourseResponse>>> {
        const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
        return this.http.get<ApiResponse<PagedResult<CourseResponse>>>(this.courseUrl, {
            params,
            withCredentials: true
        });
    }

    getDeletedCourses(page: number = 1, pageSize: number = 10): Observable<ApiResponse<PagedResult<CourseResponse>>> {
        const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
        return this.http.get<ApiResponse<PagedResult<CourseResponse>>>(`${this.courseUrl}/deleted`, {
            params,
            withCredentials: true
        });
    }

    getCourseById(id: number): Observable<ApiResponse<CourseResponse>> {
        return this.http.get<ApiResponse<CourseResponse>>(`${this.courseUrl}/detail/${id}`, {
            withCredentials: true
        });
    }

    softDeleteCourse(id: number): Observable<any> {
        return this.http.patch<any>(
            `${this.courseUrl}/${id}/toggle-soft-delete`,
            {},
            {
                withCredentials: true
            }
        );
    }

    bulkSoftDeleteCourses(ids: number[], restore: boolean = false): Observable<any> {
        return this.http.post<any>(
            `${this.courseUrl}/bulk-soft-delete`,
            { ids, restore },
            {
                withCredentials: true
            }
        );
    }

    createCourse(course: any): Observable<any> {
        return this.http.post<any>(`${this.courseUrl}/add`, course, {
            withCredentials: true
        });
    }

    updateCourse(id: number, course: any): Observable<any> {
        return this.http.put<any>(`${this.courseUrl}/edit/${id}`, course, {
            withCredentials: true
        });
    }
}
