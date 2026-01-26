import { Routes } from '@angular/router';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing-page/landing-page').then((p) => p.LandingPage),
    title: 'Quantum',
  },
];
