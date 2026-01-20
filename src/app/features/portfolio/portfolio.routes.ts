import { Routes } from '@angular/router';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: 'wallet',
    loadComponent: () =>
      import('./pages/portfolio-page/portfolio-page').then((p) => p.PortfolioPage),
    title: 'portfolio',
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./pages/watch-list-page/watch-list-page').then((p) => p.WatchListPage),
    title: 'watchlist',
  },
];
