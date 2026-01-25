import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { UserDataService } from '../../../dashboard/services/user-data-service';
import { AuthService } from '../../../../core/services/auth-service';
import { CoinApiService } from '../../../dashboard/services/coin-api-service';
import { CryptoMarket } from '../../../../shared/models/coin-api.model';
import { UserWalletResponse } from '../../../../shared/models/user-data.model';

@Component({
  selector: 'app-portfolio-page',
  imports: [],
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
}
