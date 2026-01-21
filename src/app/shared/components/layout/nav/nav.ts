import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LucideAngularModule, User, Search, Settings, LogOut } from 'lucide-angular';
import { SearchService } from '../../../../core/services/search-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { NavTickerScroll } from './nav-ticker-scroll/nav-ticker-scroll';

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
  private debounceTimer?: number;

  readonly User = User;
  readonly Search = Search;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  isMenuOpen = false;

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
}
