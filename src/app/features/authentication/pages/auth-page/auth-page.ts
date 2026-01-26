import { Component, inject, signal, computed } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { RegisterForm } from '../../components/register-form/register-form';
import { LoginData, RegisterData } from '../../models/auth-form.model';
import { AuthService } from '../../../../core/services/auth-service';
import { NavTickerScroll } from '../../../../shared/components/layout/nav/nav-ticker-scroll/nav-ticker-scroll';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auth-page',
  imports: [LoginForm, RegisterForm, NavTickerScroll],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
  private authService = inject(AuthService);
  private title = inject(Title);
  tickerElements = tickerElements;

  error = computed(() => this.authService.authError());

  isLoginForm = signal(true);

  toggleForm() {
    this.isLoginForm.update((value) => !value);
    if (this.isLoginForm()) {
      this.title.setTitle('Login');
    } else {
      this.title.setTitle('Register');
    }
    this.authService.resetError();
  }

  login(loginForm: LoginData) {
    this.authService.login(loginForm.email, loginForm.password);
  }

  register(registerForm: RegisterData) {
    this.authService.register(registerForm.email, registerForm.password, registerForm.name);
  }
}

export const tickerElements = [
  { shortName: 'bitcoin', price: 89401, percent: -0.49108 },
  { shortName: 'ethereum', price: 2941.48, percent: -2.17901 },
  { shortName: 'tether', price: 0.998746, percent: -0.02964 },
  { shortName: 'binancecoin', price: 889.87, percent: 0.20842 },
  { shortName: 'ripple', price: 1.91, percent: -1.96294 },
  { shortName: 'usd-coin', price: 0.999617, percent: -1.10792 },
  { shortName: 'solana', price: 127.79, percent: -1.71445 },
  { shortName: 'tron', price: 0.309087, percent: 3.2992 },
  { shortName: 'staked-ether', price: 2940.42, percent: -0.88857 },
  { shortName: 'dogecoin', price: 0.124926, percent: -1.07538 },
];
