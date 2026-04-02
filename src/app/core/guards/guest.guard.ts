import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((response) => {
      const user = response.data?.user || response.data;
      if (user && user.role) {
        // User is logged in, redirect away from login page
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      // If checkAuth fails, they are effectively a guest
      return of(true);
    })
  );
};
