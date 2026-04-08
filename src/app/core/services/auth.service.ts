import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  data?: {
    user?: {
      userId?: string | number;
      fullName?: string;
      email?: string;
      phoneNumber?: string;
      role?: string;
      profilePicture?: string;
    };
    expiresAtUtc?: string;
    accessToken?: string;
    // Fields for check-auth response
    userId?: string | number;
    name?: string;
    role?: string;
  };
}

export interface AuthUser {
  userId: string;
  name: string;
  role: string;
  profilePicture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'elearn-admin-auth-user';
  private readonly baseUrl = 'http://localhost:5263/api/Auth';
  private readonly authUserSubject = new BehaviorSubject<AuthUser | null>(this.getStoredAuthUser());

  readonly authUser$ = this.authUserSubject.asObservable();

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload, { withCredentials: true }).pipe(
      tap((response) => {
        if (response.data?.accessToken) {
          this.setCookie('accessToken', response.data.accessToken, response.data.expiresAtUtc);
        }
        if (response.data?.user) {
          this.setAuthUser(this.mapToAuthUser(response.data.user));
        }
      })
    );
  }

  checkAuth(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.baseUrl}/check-auth`, { withCredentials: true }).pipe(
      tap((response) => {
        const userData = response.data?.user || response.data;
        if (userData && (userData.userId || userData.role)) {
          this.setAuthUser(this.mapToAuthUser(userData));
        }
      })
    );
  }

  logout(): Observable<AuthResponse> | null {
    this.clearAuthUser();
    this.removeCookie('accessToken');
    
    return this.http.post<AuthResponse>(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }

  getAuthUser(): AuthUser | null {
    return this.authUserSubject.value;
  }

  private mapToAuthUser(source: { userId?: string | number; fullName?: string; name?: string; role?: string; profilePicture?: string; }): AuthUser {
    return {
      userId: String(source.userId ?? ''),
      name: source.fullName ?? source.name ?? 'Admin',
      role: source.role ?? 'Admin',
      profilePicture: source.profilePicture
    };
  }

  private setAuthUser(authUser: AuthUser) {
    this.authUserSubject.next(authUser);

    if (this.canUseBrowserStorage()) {
      localStorage.setItem(this.storageKey, JSON.stringify(authUser));
    }
  }

  private clearAuthUser() {
    this.authUserSubject.next(null);

    if (this.canUseBrowserStorage()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  private getStoredAuthUser(): AuthUser | null {
    if (!this.canUseBrowserStorage()) {
      return null;
    }

    const rawAuthUser = localStorage.getItem(this.storageKey);
    if (!rawAuthUser) {
      return null;
    }

    try {
      return JSON.parse(rawAuthUser) as AuthUser;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private canUseBrowserStorage(): boolean {
    return typeof window !== 'undefined' && isPlatformBrowser(this.platformId);
  }

  private setCookie(name: string, value: string, expiresUtc?: string) {
    if (!this.canUseBrowserStorage()) return;
    let cookieString = `${name}=${value};path=/`;
    if (expiresUtc) {
      cookieString += `;expires=${new Date(expiresUtc).toUTCString()}`;
    }
    document.cookie = cookieString;
  }

  public getCookie(name: string): string | null {
    if (!this.canUseBrowserStorage()) return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
  }

  private removeCookie(name: string) {
    if (!this.canUseBrowserStorage()) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}
