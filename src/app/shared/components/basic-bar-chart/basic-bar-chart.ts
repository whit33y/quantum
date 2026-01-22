import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  input,
  OnChanges,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-basic-bar-chart',
  standalone: true,
  template: `
    <div class="relative w-full h-full p-2 rounded-2xl bg-zinc-800 border border-white/5">
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
export class BasicBarChart implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;

  labels = input<string[]>([]);
  data = input<number[]>([]);
  label = input<string | undefined>('Price Change %');
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

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.labels(),
        datasets: [
          {
            label: this.label(),
            data: this.data(),
            backgroundColor: this.data().map((v) => (v >= 0 ? '#818cf8' : '#ef4444')),
            borderRadius: 8,
            borderSkipped: false,
            barThickness: 20,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 35,
          },
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
                    style: 'percent',
                    minimumFractionDigits: 2,
                  }).format(context.parsed.y / 100);
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
                return value + '%';
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
