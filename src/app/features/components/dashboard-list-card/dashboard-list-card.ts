import { Component, input, output } from '@angular/core';
import { Star, X, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-list-card',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './dashboard-list-card.html',
  styleUrl: './dashboard-list-card.css',
})
export class DashboardListCard {
  readonly StarIcon = Star;
  readonly XIcon = X;

  name = input<string>('');
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
