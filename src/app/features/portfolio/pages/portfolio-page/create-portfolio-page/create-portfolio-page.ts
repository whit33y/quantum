import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth-service';
import { CoinApiService } from '../../../../dashboard/services/coin-api-service';
import { UserDataService } from '../../../../dashboard/services/user-data-service';
import { form, FormField, min, minLength, required } from '@angular/forms/signals';
import { SearchService } from '../../../../../core/services/search-service';
import { PortfolioSearchCoin } from '../../../components/portfolio-search-coin/portfolio-search-coin';
import { CoinsSearch } from '../../../../../shared/models/coin-api.model';
import { PortfolioFindedItems } from '../../../components/portfolio-finded-items/portfolio-finded-items';
import { Button } from '../../../../../shared/components/button/button';

@Component({
  selector: 'app-create-portfolio-page',
  imports: [PortfolioSearchCoin, FormField, PortfolioFindedItems, Button],
  templateUrl: './create-portfolio-page.html',
  styleUrl: './create-portfolio-page.css',
})
export class CreatePortfolioPage {
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private userDataService = inject(UserDataService);
  private searchService = inject(SearchService);
  private debounceTimer?: number;

  searchModel = signal({ search: '' });
  searchForm = form(this.searchModel);

  coinModel = signal({ symbol: '', amount: 0 });
  coinForm = form(this.coinModel, (coinFormSchema) => {
    required(coinFormSchema.amount, { message: 'You have to pass amount' });
    required(coinFormSchema.symbol, { message: 'You have to select coin' });
    minLength(coinFormSchema.symbol, 1, { message: 'You must select coin' });
    min(coinFormSchema.amount, 0.0000000000000001, { message: 'Value must be greater than 0' });
  });

  changeSearch($event: string) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const value = $event;
      this.searchService.setSearchTermCreate(value);
      console.log(this.searchService.searchTermCreate());
      if (this.searchService.searchTermCreate().length > 0) {
        this.searchCoins(this.searchService.searchTermCreate(), this.findedCoins);
      } else {
        this.findedCoins.set([]);
      }
    }, 300);
  }

  findedCoins = signal<CoinsSearch[]>([]);
  searchCoins(search: string, targetSignal: WritableSignal<CoinsSearch[]>) {
    this.coinApiService.getCoinsSearch(search).subscribe({
      next: (response) => {
        targetSignal.set(response.coins);
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  selectCoin($event: CoinsSearch) {
    this.coinModel.set({ symbol: $event.symbol, amount: this.coinModel().amount });
    console.log(this.coinModel());
  }

  addCoin() {
    console.log(this.coinModel());
  }
}
