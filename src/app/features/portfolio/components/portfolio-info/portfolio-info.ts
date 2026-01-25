import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { WalletIcon, PlusIcon, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-info',
  imports: [LucideAngularModule, CurrencyPipe, RouterLink],
  templateUrl: './portfolio-info.html',
  styleUrl: './portfolio-info.css',
})
export class PortfolioInfo {
  readonly WalletIcon = WalletIcon;
  readonly PlusIcon = PlusIcon;

  itemsCount = input<number>(0);
  totalNetWorth = input<number>(0);
  change24h = input<number>(0);

  get changeColor() {
    if (this.change24h() > 0) {
      return 'text-emerald-400';
    }
    if (this.change24h() < 0) {
      return 'text-rose-400';
    }
    return 'text-white';
  }
}
