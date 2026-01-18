import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { verifiedGuard } from './core/guards/verified-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then((m) => m.AUTH_ROUTES),
    title: 'Sign up or log in',
  },
  //usage example
  {
    path: 'dashboard',
    canActivate: [authGuard, verifiedGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page').then(
        (m) => m.DashboardPage,
      ),
    title: 'Dashboard',
  },
];
