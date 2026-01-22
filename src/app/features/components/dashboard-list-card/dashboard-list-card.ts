import { Component, input } from '@angular/core';
import { Star, X, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-list-card',
  imports: [LucideAngularModule],
  templateUrl: './dashboard-list-card.html',
  styleUrl: './dashboard-list-card.css',
})
export class DashboardListCard {
  readonly StarIcon = Star;
  readonly XIcon = X;

  name = input<string>('');
  img = input<string>('');
  ath = input<number>(0);
  atl = input<number>(0);
  favorite = input<boolean>(false);
  currentPrice = input<number>(0);
}
