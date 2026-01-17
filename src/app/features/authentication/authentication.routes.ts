import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth-page/auth-page').then((p) => p.AuthPage),
  },
  {
    path: 'verify',
    loadComponent: () => import('./pages/verify-page/verify-page').then((p) => p.VerifyPage),
  },
];
