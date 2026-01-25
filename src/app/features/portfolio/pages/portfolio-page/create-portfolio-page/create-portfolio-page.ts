import { Component, inject, signal } from '@angular/core';
import { PortfolioAddForm } from '../../../components/portfolio-add-form/portfolio-add-form';
import { AuthService } from '../../../../../core/services/auth-service';
import { CoinApiService } from '../../../../dashboard/services/coin-api-service';
import { UserDataService } from '../../../../dashboard/services/user-data-service';
import { form, FormField, required } from '@angular/forms/signals';
import { SearchService } from '../../../../../core/services/search-service';
import { PortfolioSearchCoin } from '../../../components/portfolio-search-coin/portfolio-search-coin';

@Component({
  selector: 'app-create-portfolio-page',
  imports: [PortfolioAddForm, PortfolioSearchCoin, FormField],
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
  });

  changeSearch($event: string) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const value = $event;
      this.searchService.setSearchTermCreate(value);
      console.log(this.searchService.searchTermCreate());
    }, 300);
  }
}
