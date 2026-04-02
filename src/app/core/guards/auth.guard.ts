import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((response) => {
      const user = response.data?.user || response.data;
      
      // Check if the user has a permitted global role
      if (user && user.role) {
        const role = user.role.toUpperCase();
        if (role === 'ADMIN' || role === 'INSTRUCTOR' || role === 'MODERATOR') {
          return true;
        }
      }

      // If logged in but lacks global permission, redirect to access denied page
      router.navigate(['/auth/access']);
      return false;
    }),
    catchError(() => {
      // If checkAuth fails, or no token, redirect to login page
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
