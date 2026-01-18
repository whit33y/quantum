import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-verify-page',
  imports: [],
  templateUrl: './verify-page.html',
  styleUrl: './verify-page.css',
})
export class VerifyPage {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);

  userId = signal('');
  secret = signal('');

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId.set(params['userId']);
      this.secret.set(params['secret']);
      if (this.userId() && this.secret()) {
        this.authService.verifyEmail(this.userId(), this.secret());
      }
    });
  }

  resend() {
    this.authService.resendVerification();
  }
}
