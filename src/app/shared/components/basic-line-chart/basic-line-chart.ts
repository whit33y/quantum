import {
  Component,
  ElementRef,
  input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-basic-line-chart',
  standalone: true,
  template: `
    <div class="relative w-full h-64 p-4 rounded-2xl bg-zinc-800 border border-white/5">
      <h3 class="font-semibold text-sm text-zinc-300 uppercase tracking-wider mb-4">
        {{ label() }}
      </h3>
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class BasicLineChart implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;

  labels = input<string[]>([]);
  data = input<number[]>([]);
  label = input<string | undefined>('Price History');
  color = input<string>('#818cf8');

  private chart: Chart | undefined;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.destroy();
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(129, 140, 248, 0.5)');
    gradient.addColorStop(1, 'rgba(129, 140, 248, 0)');

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.labels(),
        datasets: [
          {
            label: this.label(),
            data: this.data(),
            borderColor: this.color,
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: this.color,
            pointHoverBorderWidth: 2,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 20,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#27272a',
            padding: 12,
            titleColor: '#fff',
            titleFont: { size: 14, weight: 'bold' },
            bodyColor: '#a1a1aa',
            bodyFont: { size: 13 },
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#a1a1aa',
              font: { size: 11 },
              maxTicksLimit: 7,
              maxRotation: 0,
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
            },
            ticks: {
              color: '#a1a1aa',
              font: { size: 11 },
              callback: function (value) {
                return new Intl.NumberFormat('en-US', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(Number(value));
              },
            },
            border: {
              display: false,
            },
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }
}
