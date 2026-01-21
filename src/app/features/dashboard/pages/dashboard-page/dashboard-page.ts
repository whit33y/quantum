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

@Component({
  selector: 'app-dashboard-page',
  imports: [InfoCard, AssetCard, ListCard, BasicBarChart, BasicLineChart],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);

  coins: CryptoMarket[] = [];
  userData: UserFavoriteResponse | null = null;

  coinInfo = signal<CoinDetails | null>(null);

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

  lineChartLabels = signal<string[]>([]);
  lineChartData = signal<number[]>([]);
  lineChartName = signal<string>('');

  readonly TrendingUp = TrendingUp;
  readonly WalletIcon = WalletIcon;

  async ngOnInit(): Promise<void> {
    // this.coinApiService.getCoinDetails('doge', true).subscribe({
    //   next: (response) => {
    //     this.coinInfo.set(response);
    //   },
    // });

    // this.coinApiService.getMarketChart('bitcoin', '30').subscribe({
    //   next: (response) => {
    //     this.lineChartName.set('bitcoin');
    //     const prices = response.prices;
    //     this.lineChartLabels.set(
    //       prices.map((p) =>
    //         new Date(p[0]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    //       ),
    //     );
    //     this.lineChartData.set(prices.map((p) => p[1]));
    //   },
    // });

    const userId = this.authService.currentUser()?.$id;
    if (userId) {
      try {
        this.userData = await this.userDataService.getUserFavorite(userId);
        console.log('User favorites:', this.userData);
      } catch (error) {
        console.error('Failed to load user favorites:', error);
      }
    }
    // if (userId) {
    //   try {
    //     const response = await this.userDataService.addFavoriteCoin(userId, 'btc');
    //     console.log(response, this.authService.currentUser());
    //   } catch (error) {
    //     console.error('Failed to add user', error);
    //   }
    // }
  }
}
