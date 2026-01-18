/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { ApiService } from '../../../../core/services/api-service';
import { CryptoMarket } from '../../../../shared/models/api.model';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);

  coins: CryptoMarket[] = [];

  ngOnInit(): void {
    // this.apiService.getMarkets().subscribe({
    //   next: (response) => {
    //     this.coins = response;
    //     console.log(this.coins);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });
    // this.apiService.getCoinDetails('bitcoin').subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    // });
  }

  logout() {
    this.authService.logout();
  }
}
