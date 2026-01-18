import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CryptoMarket } from '../../shared/models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.coingecko.com/api/v3';

  private headers = new HttpHeaders({
    'x-cg-demo-api-key': environment.coinGeckoApi,
  });

  getMarkets(currency = 'usd', limit = 50, page = 1): Observable<CryptoMarket[]> {
    return this.http.get<CryptoMarket[]>(`${this.BASE_URL}/coins/markets`, {
      headers: this.headers,
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: limit,
        page,
        sparkline: false,
      },
    });
  }
}
