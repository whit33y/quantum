import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const verifiedGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.sessionReady;

  if (authService.isEmailVerified()) {
    return true;
  }

  return router.createUrlTree(['/auth/verify']);
};
