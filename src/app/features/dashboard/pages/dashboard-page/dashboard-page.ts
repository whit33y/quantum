import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
