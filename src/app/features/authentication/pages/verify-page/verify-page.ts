import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { NavTickerScroll } from '../../../../shared/components/layout/nav/nav-ticker-scroll/nav-ticker-scroll';
import { Button } from '../../../../shared/components/button/button';
import { tickerElements } from '../auth-page/auth-page';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.html',
  styleUrl: './verify-page.css',
  imports: [NavTickerScroll, Button],
})
export class VerifyPage implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  tickerElements = tickerElements;

  userId = signal('');
  secret = signal('');
  resendCount = signal(10);

  resendAvailable = computed(() => this.resendCount() === 0);

  private intervalId?: number;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId.set(params['userId'] ?? '');
      this.secret.set(params['secret'] ?? '');

      if (this.userId() && this.secret()) {
        this.authService.verifyEmail(this.userId(), this.secret());
      } else {
        this.startCountdown();
      }
    });
  }

  private startCountdown() {
    this.clearCountdown();
    this.resendCount.set(10);

    this.intervalId = window.setInterval(() => {
      this.resendCount.update((v) => Math.max(v - 1, 0));

      if (this.resendCount() === 0) {
        this.clearCountdown();
      }
    }, 1000);
  }

  private clearCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  resend() {
    if (!this.resendAvailable()) return;

    this.authService.resendVerification();
    this.startCountdown();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.clearCountdown();
  }
}
