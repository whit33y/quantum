import { Component, input, output, signal } from '@angular/core';
import { CoinsSearch } from '../../../../shared/models/coin-api.model';

@Component({
  selector: 'app-portfolio-finded-items',
  imports: [],
  templateUrl: './portfolio-finded-items.html',
  styleUrl: './portfolio-finded-items.css',
})
export class PortfolioFindedItems {
  findedCoins = input<CoinsSearch[]>([]);
  coinSelected = output<CoinsSearch>();

  selectedCoin = signal<CoinsSearch | null>(null);

  onSelectCoin(coin: CoinsSearch) {
    this.selectedCoin.set(coin);
    this.coinSelected.emit(coin);
  }
}
