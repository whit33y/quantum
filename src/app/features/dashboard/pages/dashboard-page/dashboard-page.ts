import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { CoinDetails, CryptoMarket } from '../../../../shared/models/coin-api.model';
import { CoinApiService } from '../../services/coin-api-service';
import { UserDataService } from '../../services/user-data-service';
import { UserFavoriteResponse } from '../../../../shared/models/user-data.model';
import { InfoCard } from '../../../../shared/components/info-card/info-card';
import { TrendingUp, WalletIcon } from 'lucide-angular';
import { AssetCard } from '../../../../shared/components/asset-card/asset-card';
import { ListCard } from '../../../../shared/components/list-card/list-card';
import { BasicBarChart } from '../../../../shared/components/basic-bar-chart/basic-bar-chart';
import { BasicLineChart } from '../../../../shared/components/basic-line-chart/basic-line-chart';
import { DashboardListCard } from '../../../components/dashboard-list-card/dashboard-list-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [InfoCard, AssetCard, ListCard, BasicBarChart, BasicLineChart, DashboardListCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);

  coinInfo = signal<CoinDetails | null>(null);
  userFavoritesSymbol = signal<string[]>([]);
  watchlistTrend = signal<number>(0);
  top50list = signal<CryptoMarket[]>([]);

  coins: CryptoMarket[] = [];
  userData: UserFavoriteResponse | null = null;

  chartLabels = ['1h', '24h', '7d', '14d', '30d'];

  get watchlistElements() {
    return this.coins.map((coin) => ({
      elementName: coin.name,
      elementCode: coin.symbol.toUpperCase(),
      elementPrice: coin.current_price,
      elementStats: coin.price_change_percentage_24h,
    }));
  }

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

  lineChartLabels = signal<string[]>([]);
  lineChartData = signal<number[]>([]);
  lineChartName = signal<string>('');

  readonly TrendingUp = TrendingUp;
  readonly WalletIcon = WalletIcon;

  async ngOnInit(): Promise<void> {
    //loading data for asset card
    this.coinApiService.getCoinDetails('ethereum', true).subscribe({
      next: (response) => {
        this.coinInfo.set(response);
        console.log(response);
      },
    });

    //loading data for charts
    this.coinApiService.getMarketChart('bitcoin', '30').subscribe({
      next: (response) => {
        this.lineChartName.set('bitcoin');
        const prices = response.prices;
        this.lineChartLabels.set(
          prices.map((p) =>
            new Date(p[0]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          ),
        );
        this.lineChartData.set(prices.map((p) => p[1]));
      },
    });

    //loading data for watchlist
    const userId = this.authService.currentUser()?.$id;
    if (userId) {
      try {
        this.userData = await this.userDataService.getUserFavorite(userId);
        console.log(this.userData);

        const symbols = this.userData?.items?.slice(0, 5).map((item) => item.coinId) ?? [];

        this.userFavoritesSymbol.set(symbols);

        if (symbols.length > 0) {
          this.coinApiService.getMarkets('usd', symbols.length, 1, symbols).subscribe({
            next: (response) => {
              this.coins = response;
              const trend = response.reduce(
                (sum, coin) => sum + (coin.price_change_percentage_24h ?? 0),
                0,
              );
              this.watchlistTrend.set(trend);
              console.log('Favorite markets:', response);
            },
            error: (error) => {
              console.error('Failed to load markets:', error);
            },
          });
        }
      } catch (error) {
        console.error('Failed to load user favorites:', error);
      }
    }
    //loading top 50
    this.coinApiService.getMarkets('usd', 50, 1).subscribe({
      next: (response) => {
        this.top50list.set(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
