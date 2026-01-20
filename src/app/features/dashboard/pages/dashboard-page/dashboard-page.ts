import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { CryptoMarket } from '../../../../shared/models/coin-api.model';
// import { CoinApiService } from '../../services/coin-api-service';
import { UserDataService } from '../../services/user-data-service';
import { UserFavoriteResponse } from '../../../../shared/models/user-data.model';
import { InfoCard } from '../../../../shared/components/info-card/info-card';
import { TrendingUp, WalletIcon } from 'lucide-angular';
import { AssetCard } from '../../../../shared/components/asset-card/asset-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [InfoCard, AssetCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private authService = inject(AuthService);
  // private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);

  coins: CryptoMarket[] = [];
  userData: UserFavoriteResponse | null = null;

  readonly TrendingUp = TrendingUp;
  readonly WalletIcon = WalletIcon;

  async ngOnInit(): Promise<void> {
    // this.coinApiService.getMarkets().subscribe({
    //   next: (response) => {
    //     this.coins = response;
    //     console.log(this.coins);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
    // this.coinApiService.getCoinDetails('bitcoin').subscribe({
    //   next: (response) => {
    //     console.log(response);
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
  logout() {
    this.authService.logout();
  }
}
