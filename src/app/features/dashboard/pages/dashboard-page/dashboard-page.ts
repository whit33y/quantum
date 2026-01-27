import { Component, inject, OnInit, computed, signal, WritableSignal, effect } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { CoinDetails, CryptoMarket, MarketChart } from '../../../../shared/models/coin-api.model';
import { UserFavoriteResponse } from '../../../../shared/models/user-data.model';
import { InfoCard } from '../../components/info-card/info-card';
import { TrendingDown, TrendingUp, TrendingUpDown, WalletIcon } from 'lucide-angular';
import { AssetCard } from '../../components/asset-card/asset-card';
import { ListCard } from '../../components/list-card/list-card';
import { BasicBarChart } from '../../../../shared/components/basic-bar-chart/basic-bar-chart';
import { BasicLineChart } from '../../../../shared/components/basic-line-chart/basic-line-chart';
import { DashboardListCard } from '../../components/dashboard-list-card/dashboard-list-card';
import { CoinApiService } from '../../../../core/services/coin-api-service';
import { UserDataService } from '../../../../core/services/user-data-service';
import { Spinner } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    InfoCard,
    AssetCard,
    ListCard,
    BasicBarChart,
    BasicLineChart,
    DashboardListCard,
    Spinner,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);

  userFavoritesSymbol = signal<string[]>([]);
  watchlistTrend = signal<number>(0);

  loadingCoinInfo = signal<boolean>(true);
  loadingMarketChart = signal<boolean>(true);
  loadingWatchlist = signal<boolean>(true);
  loadingTop50 = signal<boolean>(true);

  isLoading = computed(() => {
    return (
      this.loadingCoinInfo() || this.loadingMarketChart()
      // this.loadingWatchlist() ||
      // this.loadingTop50()
    );
  });

  chartLabels = ['1h', '24h', '7d', '14d', '30d'];

  chartData = computed(() => {
    const info = this.coinInfo();
    if (!info?.market_data) return [];

    return [
      info.market_data.price_change_percentage_1h_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_24h_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_7d_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_14d_in_currency['usd'] ?? 0,
      info.market_data.price_change_percentage_30d_in_currency['usd'] ?? 0,
    ];
  });

  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly TrendingUpDown = TrendingUpDown;
  readonly WalletIcon = WalletIcon;

  userData = signal<UserFavoriteResponse | undefined>(undefined);
  async ngOnInit(): Promise<void> {
    this.getCoinDetails('bitcoin', this.coinInfo);
    this.getMarketChart('bitcoin', '30', this.marketChart, 'usd');
    await this.loadWatchlist();
    this.getMarkets('usd', 50, 1, this.top50list);
  }

  async loadWatchlist() {
    const userId = this.authService.currentUser()?.['$id'];
    if (!userId) return;
    try {
      // this.loadingWatchlist.set(true);
      const favorites = await this.userDataService.getUserFavorite(userId);
      this.userData.set(favorites);
      const symbols = favorites.items.map((item) => item.coinId);
      this.userFavoritesSymbol.set(symbols);
      if (symbols.length > 0) {
        this.getMarkets('usd', symbols.length, 1, this.coinsWatchlist, symbols);
      } else {
        this.coinsWatchlist.set([]);
      }
    } catch (error) {
      console.error('Failed to load user favorites:', error);
    } finally {
      // this.loadingWatchlist.set(false);
    }
  }

  isFavorite(symbol: string) {
    if (this.userFavoritesSymbol().includes(symbol, 0)) {
      return true;
    } else {
      return false;
    }
  }

  coinsWatchlist = signal<CryptoMarket[]>([]);

  get trendInfo() {
    if (this.watchlistTrend() > 0) return 'Positive';
    if (this.watchlistTrend() < 0) return 'Negative';
    return 'Neutral';
  }

  get infoColor() {
    if (this.watchlistTrend() > 0) return 'green';
    if (this.watchlistTrend() < 0) return 'red';
    return 'white';
  }

  get infoIcon() {
    if (this.watchlistTrend() > 0) return TrendingUp;
    if (this.watchlistTrend() < 0) return TrendingDown;
    return TrendingUpDown;
  }

  coinstWatchListEffect = effect(() => {
    const data = this.coinsWatchlist();
    if (!data.length) return;
    const trend = data.reduce((sum, coin) => sum + (coin.price_change_percentage_24h ?? 0), 0);
    this.watchlistTrend.set(trend);
  });

  get watchlistElements() {
    return this.coinsWatchlist().map((coin) => ({
      elementName: coin.name,
      elementCode: coin.symbol.toUpperCase(),
      elementPrice: coin.current_price,
      elementStats: coin.price_change_percentage_24h,
    }));
  }

  top50list = signal<CryptoMarket[]>([]);
  errorMarkets = signal<string>('');
  getMarkets(
    currency: string,
    limit: number,
    page: number,
    targetSignal: WritableSignal<CryptoMarket[]>,
    symbols?: string[],
  ) {
    this.loadingTop50.set(true);
    this.coinApiService.getMarkets(currency, limit, page, symbols).subscribe({
      next: (response) => {
        targetSignal.set(response);
        // this.loadingTop50.set(false);
      },
      error: (err) => {
        this.errorMarkets.set('Something went wrong while loading coin markets.');
        console.error(err);
        // this.loadingTop50.set(false);
      },
    });
  }

  coinInfo = signal<CoinDetails | undefined>(undefined);
  errorCoinDetails = signal<string>('');
  getCoinDetails(
    coinName: string,
    targetSignal: WritableSignal<CoinDetails | undefined>,
    tickers?: boolean,
    developer_data?: boolean,
    localization?: boolean,
    include_categories_details?: boolean,
  ) {
    this.loadingCoinInfo.set(true);
    this.coinApiService
      .getCoinDetails(coinName, tickers, developer_data, localization, include_categories_details)
      .subscribe({
        next: (response) => {
          targetSignal.set(response);
          this.loadingCoinInfo.set(false);
        },
        error: (err) => {
          console.error(err);
          this.errorCoinDetails.set('Something went wrong while loading coin details data');
          this.loadingCoinInfo.set(false);
        },
      });
  }

  marketChart = signal<MarketChart | undefined>(undefined);
  errorMarketChart = signal<string>('');
  getMarketChart(
    coinName: string,
    days: string,
    targetSignal: WritableSignal<MarketChart | undefined>,
    currency?: string,
  ) {
    this.loadingMarketChart.set(true);
    this.coinApiService.getMarketChart(coinName, days, currency).subscribe({
      next: (response) => {
        targetSignal.set(response);
        this.loadingMarketChart.set(false);
      },
      error: (err) => {
        console.error(err);
        this.errorMarketChart.set(err.message ?? 'Chart error');
        this.loadingMarketChart.set(false);
      },
    });
  }

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

  async manageWatchlist(symbol: string) {
    const userId = this.authService.currentUser()?.['$id'];
    if (!userId) return;

    try {
      const favoriteItem = this.userData()?.items.find((item) => item.coinId === symbol);

      if (favoriteItem) {
        await this.userDataService.deleteFavoriteCoin(favoriteItem.$id);
      } else {
        await this.userDataService.addFavoriteCoin(userId, symbol);
      }
      await this.loadWatchlist();
    } catch (error) {
      console.error('Error managing watchlist:', error);
    }
  }
}
