import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
    id?: number;
    name?: string;
    description?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private http = inject(HttpClient);
    private categoriesUrl = 'http://localhost:5263/api/category';

    getCategories(): Observable<any> {
        return this.http.get<any>(`${this.categoriesUrl}`, {
            withCredentials: true
        });
    }

    createCategory(category: Category): Observable<any> {
        return this.http.post<any>(`${this.categoriesUrl}/add`, category, {
            withCredentials: true
        });
    }

    updateCategory(category: Category): Observable<any> {
        return this.http.put<any>(`${this.categoriesUrl}/edit/${category.id}`, category, {
            withCredentials: true
        });
    }

    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>(`${this.categoriesUrl}/${id}`, {
            withCredentials: true
        });
    }
}
