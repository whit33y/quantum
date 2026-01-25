import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserDataService } from '../../../dashboard/services/user-data-service';
import { AuthService } from '../../../../core/services/auth-service';
import { CoinApiService } from '../../../dashboard/services/coin-api-service';
import { CryptoMarket } from '../../../../shared/models/coin-api.model';
import { UserWalletResponse } from '../../../../shared/models/user-data.model';
import { PortfolioInfo } from '../../components/portfolio-info/portfolio-info';
import { PortfolioCard } from '../../components/portfolio-card/portfolio-card';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-portfolio-page',
  imports: [PortfolioInfo, PortfolioCard, RouterLink, Button],
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.css',
})
export class PortfolioPage implements OnInit {
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);

  async ngOnInit(): Promise<void> {
    await this.loadWallet();
  }

  walletData = signal<UserWalletResponse | undefined>(undefined);
  async loadWallet() {
    const userId = this.authService.currentUser()?.['$id'];
    if (!userId) return;
    try {
      const portfolioCoins = await this.userDataService.getUserWallet(userId);
      if (portfolioCoins) {
        this.walletData.set(portfolioCoins);
        if (this.walletData()) {
          const symbols = this.walletData()?.items.map((item) => item.coinId);
          console.log(symbols);
          if (symbols && symbols.length > 0) {
            this.getMarkets('usd', this.walletData()!.total, 1, this.walletElements, symbols);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load wallet, ', error);
    }
  }

  walletElements = signal<CryptoMarket[]>([]);
  errorMarkets = signal<string>('');
  loadingMarkets = signal<boolean>(false);
  getMarkets(
    currency: string,
    limit: number,
    page: number,
    targetSignal: WritableSignal<CryptoMarket[]>,
    symbols?: string[],
  ) {
    this.loadingMarkets.set(true);
    this.coinApiService.getMarkets(currency, limit, page, symbols).subscribe({
      next: (response) => {
        this.loadingMarkets.set(false);
        targetSignal.set(response);
      },
      error: (err) => {
        this.loadingMarkets.set(false);
        this.errorMarkets.set('Something went wrong while loading coin markets.');
        console.error(err);
      },
    });
  }

  get totalNetWorth() {
    let totalNetWorth = 0;
    const walletData = this.walletData();
    if (walletData && this.walletElements()) {
      for (const element of this.walletElements()) {
        for (const coin of walletData.items) {
          if (element.symbol === coin.coinId) {
            totalNetWorth += element.current_price * coin.walletBalance;
          }
        }
      }
    }
    return totalNetWorth;
  }

  get changeInWallet() {
    let currentPrice = 0;
    let price24h = 0;
    const walletData = this.walletData();
    if (walletData && this.walletElements()) {
      for (const element of this.walletElements()) {
        for (const coin of walletData.items) {
          if (element.symbol === coin.coinId) {
            currentPrice += element.current_price * coin.walletBalance;
            price24h += element.high_24h * coin.walletBalance;
          }
        }
      }
    }
    return currentPrice - price24h;
  }

  async removeFromPortfolio(id: string) {
    console.log(id);
    const userId = this.authService.currentUser()?.['$id'];
    if (!userId) return;
    try {
      await this.userDataService.deleteWalletCoin(id);
      const currentWallet = this.walletData();
      if (currentWallet) {
        this.walletData.set({
          ...currentWallet,
          items: currentWallet.items.filter((item) => item.coinId !== id),
          total: currentWallet.total - 1,
        });
      }
      this.walletElements.set(this.walletElements().filter((element) => element.symbol !== id));
    } catch (error) {
      console.error('Error while deleting', error);
    }
  }
}
