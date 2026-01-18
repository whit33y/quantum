import { Routes } from '@angular/router';
import { noAuthGuard } from '../../core/guards/no-auth-guard';
import { authGuard } from '../../core/guards/auth-guard';
import { notVerifiedGuard } from '../../core/guards/not-verified-guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./pages/auth-page/auth-page').then((p) => p.AuthPage),
  },
  {
    path: 'verify',
    canActivate: [authGuard, notVerifiedGuard],
    loadComponent: () => import('./pages/verify-page/verify-page').then((p) => p.VerifyPage),
  },
];
