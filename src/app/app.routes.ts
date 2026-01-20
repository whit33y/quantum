import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { verifiedGuard } from './core/guards/verified-guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard, verifiedGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then((r) => r.AUTH_ROUTES),
    title: 'Sign up or log in',
  },
  {
    path: 'portfolio',
    canActivate: [authGuard, verifiedGuard],
    loadChildren: () =>
      import('./features/portfolio/portfolio.routes').then((r) => r.PORTFOLIO_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/pages/not-found-page/not-found-page').then((p) => p.NotFoundPage),
  },
];
