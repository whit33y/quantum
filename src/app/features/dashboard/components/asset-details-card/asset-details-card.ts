import { Component, input } from '@angular/core';
import { DatePipe, UpperCasePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { CoinDetails } from '../../../../shared/models/coin-api.model';
import { Calendar, Cpu, Hash, LucideAngularModule, TrendingUp, TrendingDown } from 'lucide-angular';
import { BasicLineChart } from '../../../../shared/components/basic-line-chart/basic-line-chart';
import { BasicBarChart } from '../../../../shared/components/basic-bar-chart/basic-bar-chart';

@Component({
  selector: 'app-asset-details-card',
  imports: [
    UpperCasePipe,
    LucideAngularModule,
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    BasicLineChart,
    BasicBarChart,
  ],
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
  lineChartData = input<number[]>([]);
  lineChartLabels = input<string[]>([]);
  chartData = input<number[]>([]);
  chartLabel = input<string[]>([]);
}
