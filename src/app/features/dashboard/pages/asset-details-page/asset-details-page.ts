import { Component, effect, inject, input, signal } from '@angular/core';
import { CoinApiService } from '../../services/coin-api-service';
import { CoinDetails } from '../../../../shared/models/coin-api.model';

@Component({
  selector: 'app-asset-details-page',
  imports: [],
  templateUrl: './asset-details-page.html',
  styleUrl: './asset-details-page.css',
})
export class AssetDetailsPage {
  private coinApiService = inject(CoinApiService);
  coinId = input<string>();

  eff = effect(() => {
    const id = this.coinId();
    if (id) {
      this.loadCoinDetails(id);
    }
  });

  error = signal<string>('');
  coinDetails = signal<CoinDetails | undefined>(undefined);
  loadCoinDetails(coinId: string) {
    this.coinApiService.getCoinDetails(coinId).subscribe({
      next: (response) => {
        this.coinDetails.set(response);
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
