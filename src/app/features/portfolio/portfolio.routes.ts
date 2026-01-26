import { Routes } from '@angular/router';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: 'wallet',
    loadComponent: () =>
      import('./pages/portfolio-page/portfolio-page').then((p) => p.PortfolioPage),
    title: 'Wallet',
  },
  {
    path: 'wallet/create',
    loadComponent: () =>
      import('./pages/portfolio-page/create-portfolio-page/create-portfolio-page').then(
        (p) => p.CreatePortfolioPage,
      ),
    title: 'Wallet - add',
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./pages/watch-list-page/watch-list-page').then((p) => p.WatchListPage),
    title: 'Favorites',
  },
];
