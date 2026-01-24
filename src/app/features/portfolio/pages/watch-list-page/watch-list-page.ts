import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserDataService } from '../../../dashboard/services/user-data-service';
import { AuthService } from '../../../../core/services/auth-service';
import { CoinApiService } from '../../../dashboard/services/coin-api-service';
import { UserFavorite, UserFavoriteResponse } from '../../../../shared/models/user-data.model';
import { CryptoMarket } from '../../../../shared/models/coin-api.model';
import { WatchListCard } from '../../components/watch-list-card/watch-list-card';
import { WatchListInfo } from '../../components/watch-list-info/watch-list-info';

@Component({
  selector: 'app-watch-list-page',
  imports: [WatchListCard, WatchListInfo],
  templateUrl: './watch-list-page.html',
  styleUrl: './watch-list-page.css',
})
export class WatchListPage implements OnInit {
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);

  async ngOnInit(): Promise<void> {
    await this.loadWatchlist();
  }

  userData = signal<UserFavoriteResponse | undefined>(undefined);
  userFavorites = signal<UserFavorite[]>([]);
  watchlist = signal<CryptoMarket[]>([]);

  async loadWatchlist() {
    const userId = this.authService.currentUser()?.['$id'];
    if (!userId) return;
    try {
      const favorites = await this.userDataService.getUserFavorite(userId);
      if (favorites) {
        this.userData.set(favorites);
        this.userFavorites.set(favorites.items);
        const symbols = this.userFavorites().map((item) => item.coinId);
        if (symbols.length > 0) {
          this.getMarkets('usd', 200, 1, this.watchlist, symbols);
        }
      }
    } catch (error) {
      console.error('Failed to load user favorites:', error);
    }
  }

  loadingWatchlist = signal<boolean>(false);
  errorMarkets = signal<string>('');
  getMarkets(
    currency: string,
    limit: number,
    page: number,
    targetSignal: WritableSignal<CryptoMarket[]>,
    symbols?: string[],
  ) {
    this.loadingWatchlist.set(true);
    this.coinApiService.getMarkets(currency, limit, page, symbols).subscribe({
      next: (response) => {
        this.loadingWatchlist.set(false);
        targetSignal.set(response);
      },
      error: (err) => {
        this.loadingWatchlist.set(false);
        this.errorMarkets.set('Something went wrong while loading coin markets.');
        console.error(err);
      },
    });
  }

  async removeFromWatchlist(symbol: string) {
    const userId = this.authService.currentUser()?.['$id'];
    if (!userId) return;
    try {
      const favoriteItem = this.userData()?.items.find((item) => item.coinId === symbol);

      if (favoriteItem) {
        await this.userDataService.deleteFavoriteCoin(favoriteItem.$id);
        const updatedFavorites = this.userFavorites().filter((item) => item.coinId !== symbol);
        this.userFavorites.set(updatedFavorites);

        this.userData.set({
          total: updatedFavorites.length,
          items: updatedFavorites,
        });
        this.watchlist.set(this.watchlist().filter((coin) => coin.symbol !== symbol));
      }
    } catch (error) {
      console.error('Error managing watchlist:', error);
    }
  }
}
