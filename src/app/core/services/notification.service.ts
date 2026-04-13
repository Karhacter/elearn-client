import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationResponse, NotificationSummaryResponse } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5263/api/notifications';

    getNotifications(): Observable<{ data: NotificationResponse[] }> {
        return this.http.get<{ data: NotificationResponse[] }>(this.apiUrl, {
            withCredentials: true
        });
    }

    getSummary(): Observable<{ data: NotificationSummaryResponse }> {
        return this.http.get<{ data: NotificationSummaryResponse }>(`${this.apiUrl}/summary`, {
            withCredentials: true
        });
    }

    markAsRead(id: number): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}/read`, {}, {
            withCredentials: true
        });
    }

    markAllAsRead(): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/read-all`, {}, {
            withCredentials: true
        });
    }

    deleteNotification(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, {
            withCredentials: true
        });
    }
}
