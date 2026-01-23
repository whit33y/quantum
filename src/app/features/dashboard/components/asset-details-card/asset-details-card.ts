import { Component, input } from '@angular/core';
import { DatePipe, UpperCasePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { CoinDetails } from '../../../../shared/models/coin-api.model';
import {
  Calendar,
  Cpu,
  Hash,
  LucideAngularModule,
  TrendingUp,
  TrendingDown,
  AlignLeft,
} from 'lucide-angular';

@Component({
  selector: 'app-asset-details-card',
  imports: [UpperCasePipe, LucideAngularModule, DatePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './asset-details-card.html',
  styleUrl: './asset-details-card.css',
})
export class AssetDetailsCard {
  readonly HashIcon = Hash;
  readonly CalendarIcon = Calendar;
  readonly CpuIcon = Cpu;
  readonly TrendingUpIcon = TrendingUp;
  readonly TrendingDownIcon = TrendingDown;

  coinDetails = input<CoinDetails>();
}
