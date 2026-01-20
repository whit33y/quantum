import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page').then((p) => p.DashboardPage),
    title: 'dashboard',
  },
  {
    path: 'asset-details/:coinId',
    loadComponent: () =>
      import('./pages/asset-details-page/asset-details-page').then((p) => p.AssetDetailsPage),
    title: 'asset details',
  },
];
