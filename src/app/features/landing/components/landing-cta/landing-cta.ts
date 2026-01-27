import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-landing-cta',
  imports: [RouterLink, Button],
  templateUrl: './landing-cta.html',
  styleUrl: './landing-cta.css',
})
export class LandingCta implements OnInit, OnDestroy {
  images = ['/quantum1.webp', '/quantum2.webp', '/quantum3.webp'];
  currentImage = signal(this.images[0]);
  private intervalSub?: Subscription;

  ngOnInit() {
    let index = 0;
    this.intervalSub = interval(3000).subscribe(() => {
      index = (index + 1) % this.images.length;
      this.currentImage.set(this.images[index]);
    });
  }

  ngOnDestroy() {
    this.intervalSub?.unsubscribe();
  }
}
