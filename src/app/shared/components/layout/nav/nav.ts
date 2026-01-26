import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  WritableSignal,
  OnInit,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LucideAngularModule, User, Search, Settings, LogOut, Wallet, Star } from 'lucide-angular';
import { SearchService } from '../../../../core/services/search-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { NavTickerScroll } from './nav-ticker-scroll/nav-ticker-scroll';
import { CoinsSearch, CryptoMarket } from '../../../models/coin-api.model';
import { CoinApiService } from '../../../../core/services/coin-api-service';

@Component({
  selector: 'app-nav',
  imports: [LucideAngularModule, FormField, RouterLink, NavTickerScroll, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  private elementRef = inject(ElementRef);
  private searchService = inject(SearchService);
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private debounceTimer?: number;

  readonly User = User;
  readonly Star = Star;
  readonly Wallet = Wallet;
  readonly Search = Search;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  isMenuOpen = false;
  isSearchDropdownOpen = signal<boolean>(false);
  isSearchLoading = signal<boolean>(false);

  ticker = signal<CryptoMarket[]>([]);
  ngOnInit() {
    this.getMarkets('usd', 10, 1, this.ticker);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
      this.isSearchDropdownOpen.set(false);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  searchModel = signal({ search: '' });
  searchForm = form(this.searchModel);

  changeSearch() {
    clearTimeout(this.debounceTimer);
    const value = this.searchModel().search;

    if (value.length > 0) {
      this.isSearchLoading.set(true);
      this.isSearchDropdownOpen.set(true);
    } else {
      this.isSearchLoading.set(false);
      this.isSearchDropdownOpen.set(false);
      this.findedCoins.set([]);
    }

    this.debounceTimer = setTimeout(() => {
      this.searchService.setSearchTerm(value);
      if (this.searchService.searchTerm().length > 0) {
        this.searchCoins(this.searchService.searchTerm(), this.findedCoins);
      } else {
        this.findedCoins.set([]);
      }
    }, 300);
  }

  logout() {
    this.authService.logout();
  }

  get tickerListElements() {
    return this.ticker().map((coin) => ({
      shortName: coin.name,
      price: coin.current_price,
      percent: coin.price_change_percentage_24h,
    }));
  }

  apiContected = signal<boolean>(true);
  errorMarkets = signal<string>('');
  getMarkets(
    currency: string,
    limit: number,
    page: number,
    targetSignal: WritableSignal<CryptoMarket[]>,
    symbols?: string[],
  ) {
    this.coinApiService.getMarkets(currency, limit, page, symbols).subscribe({
      next: (response) => {
        targetSignal.set(response);
        this.apiContected.set(true);
      },
      error: (err) => {
        this.apiContected.set(false);
        this.errorMarkets.set('Something went wrong while loading coin markets.');
        console.error(err);
      },
    });
  }

  errorSearch = signal<string>('');
  findedCoins = signal<CoinsSearch[]>([]);
  searchCoins(search: string, targetSignal: WritableSignal<CoinsSearch[]>) {
    this.coinApiService.getCoinsSearch(search).subscribe({
      next: (response) => {
        targetSignal.set(response.coins);
        this.isSearchLoading.set(false);
      },
      error: (error) => {
        this.errorSearch.set('Something went wrong while searching');
        this.isSearchLoading.set(false);
        console.error(error);
      },
    });
  }

  closeSearchDropdown() {
    this.searchService.setSearchTerm('');
    this.isSearchDropdownOpen.set(false);
    this.searchModel.set({ search: '' });
  }
}
