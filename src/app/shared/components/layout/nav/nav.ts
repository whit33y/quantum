import { Component, ElementRef, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LucideAngularModule, User, Search, Settings, LogOut } from 'lucide-angular';
import { SearchService } from '../../../../core/services/search-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { NavTickerScroll } from './nav-ticker-scroll/nav-ticker-scroll';
import { CryptoMarket } from '../../../models/coin-api.model';
import { CoinApiService } from '../../../../features/dashboard/services/coin-api-service';

@Component({
  selector: 'app-nav',
  imports: [LucideAngularModule, FormField, RouterLink, NavTickerScroll],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private elementRef = inject(ElementRef);
  private searchService = inject(SearchService);
  private authService = inject(AuthService);
  private coinApiService = inject(CoinApiService);
  private debounceTimer?: number;

  readonly User = User;
  readonly Search = Search;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  isMenuOpen = false;

  ticker = signal<CryptoMarket[]>([]);
  ngOnInit() {
    this.getMarkets('usd', 10, 1, this.ticker);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  searchModel = signal({ search: '' });
  searchForm = form(this.searchModel);

  changeSearch() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const value = this.searchModel().search;
      this.searchService.setSearchTerm(value);
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
      },
      error: (err) => {
        this.errorMarkets.set('Something went wrong while loading coin markets.');
        console.error(err);
      },
    });
  }
}
