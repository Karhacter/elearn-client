import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    private userUrl = 'http://localhost:5263/api/User';

    getUsers(page: number = 1, pageSize: number = 10): Observable<any> {
        return this.http.get<any>(`${this.userUrl}?page=${page}&pageSize=${pageSize}`, {
            withCredentials: true
        });
    }

    getInstructors(page: number = 1, pageSize: number = 10): Observable<any> {
        return this.http.get<any>(`${this.userUrl}/instructors?page=${page}&pageSize=${pageSize}`, {
            withCredentials: true
        });
    }

    getDeletedInstructors(page: number = 1, pageSize: number = 10): Observable<any> {
        return this.http.get<any>(`${this.userUrl}/instructors/deleted?page=${page}&pageSize=${pageSize}`, {
            withCredentials: true
        });
    }

    getDeletedUsers(): Observable<{ data: User[] }> {
        return this.http.get<{ data: User[] }>(`${this.userUrl}/deleted`, {
            withCredentials: true
        });
    }

    private cachedUser: User | null = null;

    getCurrentUser(id: number): Observable<{ data: User }> {
        if (this.cachedUser && this.cachedUser.userId === id) {
            return of({ data: this.cachedUser });
        }
        return this.getUserById(id).pipe(
            tap((res) => {
                if (res && res.data) {
                    this.cachedUser = res.data;
                }
            })
        );
    }

    getUserById(id: number): Observable<{ data: User }> {
        return this.http.get<{ data: User }>(`${this.userUrl}/detail/${id}`, {
            withCredentials: true
        });
    }

    createUser(user: any): Observable<any> {
        return this.http.post<any>(`${this.userUrl}/add`, user, {
            withCredentials: true
        });
    }

    updateUser(id: number, user: any): Observable<any> {
        return this.http
            .put<any>(`${this.userUrl}/edit/${id}`, user, {
                withCredentials: true
            })
            .pipe(
                tap(() => {
                    if (this.cachedUser && this.cachedUser.userId === id) {
                        this.cachedUser = { ...this.cachedUser, ...user };
                    }
                })
            );
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete<any>(`${this.userUrl}/${id}`, {
            withCredentials: true
        });
    }

    // soft - delete
    softDeleteUser(id: number): Observable<any> {
        return this.http.patch<any>(
            `${this.userUrl}/${id}/toggle-soft-delete`,
            {},
            {
                withCredentials: true
            }
        );
    }

    bulkSoftDelete(ids: number[]): Observable<any> {
        return this.http.post<any>(
            `${this.userUrl}/bulk-soft-delete`,
            { ids },
            {
                withCredentials: true
            }
        );
    }

    updateUserImage(id: number, imageUrl: string): Observable<any> {
        return this.http.patch<any>(
            `${this.userUrl}/${id}/image`,
            { imageUrl },
            {
                withCredentials: true
            }
        );
    }

    uploadUserImage(id: number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imageFile', file);
        return this.http.post<any>(`${this.userUrl}/${id}/upload-image`, formData, {
            withCredentials: true
        });
    }
}
