import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface User {
    userId?: number;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    profilePicture?: string;
    isEmailVerified?: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private authUrl = 'http://localhost:5263/api/Auth';
    private userUrl = 'http://localhost:5263/api/User';

    private getHeaders(): HttpHeaders {
        const token = this.authService.getCookie('accessToken');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    getUsers(): Observable<{ data: User[] }> {
        return this.http.get<{ data: User[] }>(`${this.authUrl}/users`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    getDeletedUsers(): Observable<{ data: User[] }> {
        return this.http.get<{ data: User[] }>(`${this.userUrl}/deleted`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    getUserById(id: number): Observable<{ data: User }> {
        return this.http.get<{ data: User }>(`${this.userUrl}/detail/${id}`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    createUser(user: any): Observable<any> {
        return this.http.post<any>(`${this.userUrl}/add`, user, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    updateUser(id: number, user: any): Observable<any> {
        return this.http.put<any>(`${this.userUrl}/edit/${id}`, user, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(`${this.userUrl}/${id}`, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    // soft - detele
    softDeleteUser(id: number): Observable<any> {
        return this.http.patch<any>(`${this.userUrl}/${id}/toggle-soft-delete`, {}, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }

    updateUserImage(id: number, imageUrl: string): Observable<any> {
        return this.http.patch<any>(
            `${this.userUrl}/${id}/image`,
            { imageUrl },
            {
                headers: this.getHeaders(),
                withCredentials: true
            }
        );
    }

    uploadUserImage(id: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imageFile', file);
        return this.http.post<any>(`${this.userUrl}/${id}/upload-image`, formData, {
            headers: this.getHeaders(),
            withCredentials: true
        });
    }
}
