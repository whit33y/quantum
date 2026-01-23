import { Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-info-card',
  imports: [LucideAngularModule],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCard {
  title = input<string>('');
  value = input<string | number>('');
  info = input<string>('');
  mainIcon = input<LucideIconData | undefined>(undefined);
  secondIcon = input<LucideIconData | undefined>(undefined);
  infoColor = input<'white' | 'green' | 'red'>('white');
  empty = input<boolean>(false);
  emptyText = input<string>('');

  getInfoColor(color: 'white' | 'green' | 'red') {
    if (color === 'white') return 'text-white';
    if (color === 'green') return 'text-emerald-400';
    if (color === 'red') return 'text-red-400';
    return 'white';
  }
}
