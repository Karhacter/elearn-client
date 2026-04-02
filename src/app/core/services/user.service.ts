import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface User {
    userId?: number;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    profilePicture?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private baseUrl = 'http://localhost:5263/api/Auth';

    getUsers(): Observable<{ data: User[] }> {
        const token = this.authService.getCookie('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
        // Make sure the port and url matches. The user specified: http://localhost:5263/api/auth/users
        return this.http.get<{ data: User[] }>(`${this.baseUrl}/users`, { headers, withCredentials: true });
    }
}
