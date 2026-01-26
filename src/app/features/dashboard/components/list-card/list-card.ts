import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list-card',
  imports: [SlicePipe],
  templateUrl: './list-card.html',
  styleUrl: './list-card.css',
})
export class ListCard {
  listTitle = input<string>('');
  elements = input<ListElement[]>([]);

  getStatsColor(stats: number) {
    if (stats > 0) return 'text-emerald-400';
    if (stats < 0) return 'text-red-400';
    return 'text-white';
  }

  getLogoColor(stats: number) {
    if (stats > 0) return 'bg-emerald-400 text-emerald-800';
    if (stats < 0) return 'bg-red-400 text-red-800';
    return 'bg-orange-400 text-orange-800';
  }
}

interface ListElement {
  elementName: string;
  elementCode: string;
  elementPrice: number;
  elementStats: number;
}
