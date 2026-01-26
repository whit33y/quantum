import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './shared/components/layout/nav/nav';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('quantum');
  private authService = inject(AuthService);

  protected isLoggedIn = signal(false);
  protected isVerified = signal(false);
  eff = effect(() => {
    const loggedIn = this.authService.isLoggedIn();
    this.isLoggedIn.set(loggedIn);
    const isVerified = this.authService.isEmailVerified();
    this.isVerified.set(isVerified);
  });
}
