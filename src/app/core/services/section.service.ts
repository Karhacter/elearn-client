import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

    getSections(courseId: number): Observable<any> {
        return this.http.get<any>(`${this.courseUrl}/${courseId}/sections`, {
            withCredentials: true
        });
    }

    getDeleted(courseId: number): Observable<any> {
        return this.http.get<any>(`${this.courseUrl}/${courseId}/sections/deleted`, {
            withCredentials: true
        });
    }

    createSection(courseId: number, section: Section): Observable<any> {
        return this.http.post<any>(`${this.courseUrl}/${courseId}/sections`, section, {
            withCredentials: true
        });
    }

    updateSection(courseId: number, section: Section): Observable<any> {
        return this.http.put<any>(`${this.courseUrl}/${courseId}/sections/${section.id}`, section, {
            withCredentials: true
        });
    }

    bulkSoftDeleteSections(courseId: number, ids: number[],restore: boolean = false): Observable<any> {
        return this.http.post<any>(`${this.courseUrl}/${courseId}/sections/bulk-soft-delete`,  { ids, restore },
            {
                withCredentials: true
            }
        );
    }

    softDeleteSection(courseId: number, sectionId: number): Observable<any> {
        return this.http.patch<any>(`${this.courseUrl}/${courseId}/sections/${sectionId}/toggle-soft-delete`, {}, {
            withCredentials: true
        });
    }
    
   
}
