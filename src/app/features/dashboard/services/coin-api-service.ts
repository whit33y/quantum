import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CoinDetails, CryptoMarket, MarketChart } from '../../../shared/models/coin-api.model';

@Injectable({
  providedIn: 'root',
})
export class CoinApiService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.coingecko.com/api/v3';

  private headers = new HttpHeaders({
    'x-cg-demo-api-key': environment.coinGeckoApi,
  });

  getMarkets(
    currency = 'usd',
    limit = 50,
    page = 1,
    symbols?: string[],
  ): Observable<CryptoMarket[]> {
    return this.http.get<CryptoMarket[]>(`${this.BASE_URL}/coins/markets`, {
      headers: this.headers,
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: limit,
        page,
        sparkline: false,
        ...(symbols?.length && { symbols: symbols.join(',') }),
      },
    });
  }

  getCoinDetails(
    coinId: string,
    tickers = false,
    developer_data = false,
    localization = false,
    include_categories_details = false,
  ): Observable<CoinDetails> {
    return this.http.get<CoinDetails>(`${this.BASE_URL}/coins/${coinId}`, {
      headers: this.headers,
      params: {
        developer_data,
        localization,
        include_categories_details,
        tickers,
      },
    });
  }

  getMarketChart(
    coinId: string,
    days: string,
    currency = 'usd',
  ): Observable<MarketChart> {
    return this.http.get<MarketChart>(
      `${this.BASE_URL}/coins/${coinId}/market_chart`,
      {
        headers: this.headers,
        params: {
          vs_currency: currency,
          days,
        },
      },
    );
  }
}
