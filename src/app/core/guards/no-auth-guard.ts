import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.sessionReady;

  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/dashboard']);
  }
  return true;
};
