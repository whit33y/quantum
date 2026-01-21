import { Component, input } from '@angular/core';

@Component({
  selector: 'app-nav-ticker-scroll',
  imports: [],
  templateUrl: './nav-ticker-scroll.html',
  styleUrl: './nav-ticker-scroll.css',
})
export class NavTickerScroll {
  tickerElements = input<TickerElement[]>([]);

  getColor(percent: number) {
    if (percent === 0) return 'text-zinc-400';
    if (percent < 0) return 'text-rose-400';
    if (percent > 0) return 'text-emerald-400';
    return 'text-zinc-400';
  }
}

interface TickerElement {
  shortName: string;
  price: number;
  percent: number;
}
