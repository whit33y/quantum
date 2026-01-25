import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-portfolio-card',
  imports: [RouterLink, CurrencyPipe, LucideAngularModule],
  templateUrl: './portfolio-card.html',
  styleUrl: './portfolio-card.css',
})
export class PortfolioCard {
  readonly XIcon = XIcon;

  walletAmmount = input<number>(0);
  totalBalance = input<number>(0);
  currentPrice = input<number>(0);
  changePercentage24h = input<number>(0);
  img = input<string>('');
  id = input<string>('');
  name = input<string>('');
  symbol = input<string>('');

  portfolioId = output<string>();
  emitPortfolioId(event: string) {
    this.portfolioId.emit(event);
  }

  get infoColor() {
    if (this.changePercentage24h() > 0) return 'text-emerald-400';
    if (this.changePercentage24h() < 0) return 'text-rose-400';
    return 'text-white';
  }
}
