import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

/**
 * Role-based guard to check if the user has the required permissions to access a route.
 * You specify allowed roles inside the route's 'data' object.
 *
 * Usage Example in a routing file:
 * { 
 *   path: 'user', 
 *   component: UserComponent, 
 *   canActivate: [roleGuard], 
 *   data: { roles: ['ADMIN'] } 
 * }
 */
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Retrieve the expected roles assigned to the route
  const expectedRoles: string[] = route.data['roles'] || [];

  return authService.checkAuth().pipe(
    map((response) => {
      const user = response.data?.user || response.data;
      const userRole = user?.role?.toUpperCase();

      if (userRole && expectedRoles.map(r => r.toUpperCase()).includes(userRole)) {
        return true; 
      }

      // If user logined but no matching role -> redirect to access denied (or stay on same page)
      router.navigate(['/auth/access']);
      return false;
    }),
    catchError(() => {
      // If validation fails entirely (e.g. invalid token) -> redirect to login
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
