import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
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
    private authService = inject(AuthService);

    private getHeaders(): HttpHeaders {
        const token = this.authService.getCookie('accessToken');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    getCategories(): Observable<any> {
        return this.http.get<any>(`${this.categoriesUrl}`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    createCategory(category: Category): Observable<any> {
        return this.http.post<any>(`${this.categoriesUrl}/add`, category, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    updateCategory(category: Category): Observable<any> {
        return this.http.put<any>(`${this.categoriesUrl}/edit/${category.id}`, category, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>(`${this.categoriesUrl}/${id}`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }
}
