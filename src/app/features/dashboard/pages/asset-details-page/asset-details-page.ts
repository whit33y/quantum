import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CoinApiService } from '../../services/coin-api-service';
import { CoinDetails, MarketChart } from '../../../../shared/models/coin-api.model';
import { AssetDetailsCard } from '../../components/asset-details-card/asset-details-card';
import { UserDataService } from '../../services/user-data-service';
import { AuthService } from '../../../../core/services/auth-service';
import { UserFavorite, UserFavoriteResponse } from '../../../../shared/models/user-data.model';

@Component({
  selector: 'app-asset-details-page',
  imports: [AssetDetailsCard],
  templateUrl: './asset-details-page.html',
  styleUrl: './asset-details-page.css',
})
export class AssetDetailsPage implements OnInit {
  private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);
  private authService = inject(AuthService);
  coinId = input<string>();
  favs = signal<string[]>([]);
  favsFull = signal<UserFavorite[]>([]);
  userId = signal<string>('');
  symbol = signal<string>('');

  async ngOnInit() {
    const userId = this.authService.currentUser()?.['$id'];
    if (userId) {
      this.userId.set(userId);
    }
    if (!userId) return;
    try {
      const favorites = await this.userDataService.getUserFavorite(userId);
      this.userData.set(favorites);
      if (favorites.items) {
        this.favsFull.set(favorites.items);
        favorites.items.forEach((item) => {
          this.favs.update((value) => [...value, item.coinId]);
        });
      }
    } catch (error) {
      console.error('Failed to load user favorites:', error);
    }
  }

  isFavorite(symbol: string) {
    console.log(symbol, this.favs());
    if (this.favs().includes(symbol, 0)) {
      return true;
    } else {
      return false;
    }
  }

  eff = effect(() => {
    const id = this.coinId();
    if (id) {
      this.loadCoinDetails(id, this.coinDetails);
      this.getMarketChart(id, '30', this.marketChart, 'usd');
    }
  });

  error = signal<string>('');
  coinDetails = signal<CoinDetails | undefined>(undefined);
  loadCoinDetails(
    coinId: string,
    targetSignal?: WritableSignal<CoinDetails | undefined>,
    tickers?: boolean,
    developer_data?: boolean,
    localization?: boolean,
    include_categories_details?: boolean,
  ) {
    this.coinApiService
      .getCoinDetails(coinId, tickers, developer_data, localization, include_categories_details)
      .subscribe({
        next: (response) => {
          if (targetSignal) {
            targetSignal.set(response);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  chartLabels = ['1h', '24h', '7d', '14d', '30d'];

  chartData = computed(() => {
    const info = this.coinDetails();
    if (!info?.market_data) return [];

    return [
      info.market_data.price_change_percentage_1h_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_24h_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_7d_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_14d_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_30d_in_currency['usd'] ?? 0,
    ];
  });

  lineChartLabels = computed(() => {
    const chart = this.marketChart();
    if (!chart) return [];

    return chart.prices.map((p) =>
      new Date(p[0]).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
    );
  });

  lineChartData = computed(() => {
    const chart = this.marketChart();
    if (!chart) return [];

    return chart.prices.map((p) => p[1]);
  });

  marketChart = signal<MarketChart | undefined>(undefined);
  errorMarketChart = signal<string>('');
  getMarketChart(
    coinName: string,
    days: string,
    targetSignal: WritableSignal<MarketChart | undefined>,
    currency?: string,
  ) {
    this.coinApiService.getMarketChart(coinName, days, currency).subscribe({
      next: targetSignal.set,
      error: (err) => {
        console.error(err);
        this.errorMarketChart.set(err.message ?? 'Chart error');
      },
    });
  }

  userData = signal<UserFavoriteResponse | undefined>(undefined);

  async manageWatchlist(symbol: string) {
    const userId = this.authService.currentUser()?.['$id'];
    if (!userId) return;

    try {
      const favoriteItem = this.userData()?.items.find((item) => item.coinId === symbol);

      if (favoriteItem) {
        await this.userDataService.deleteFavoriteCoin(favoriteItem.$id);
        this.favs.update((values) => values.filter((fav) => fav !== symbol));
      } else {
        await this.userDataService.addFavoriteCoin(userId, symbol);
        this.favs.update((values) => [...values, symbol]);
      }
    } catch (error) {
      console.error('Error managing watchlist:', error);
    }
  }
}
