import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Star, X, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-watch-list-card',
  imports: [LucideAngularModule, CurrencyPipe, RouterLink],
  templateUrl: './watch-list-card.html',
  styleUrl: './watch-list-card.css',
})
export class WatchListCard {
  readonly StarIcon = Star;
  readonly XIcon = X;

  name = input<string>('');
  id = input<string>('');
  symbol = input<string>('');
  img = input<string>('');
  ath = input<number>(0);
  atl = input<number>(0);
  favorite = input<boolean>(false);
  currentPrice = input<number>(0);

  watchlistId = output<string>();
  emitWatchlistId(event: string) {
    this.watchlistId.emit(event);
  }
}
