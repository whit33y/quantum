import { Component, inject, signal, computed } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { RegisterForm } from '../../components/register-form/register-form';
import { LoginData, RegisterData } from '../../models/auth-form.model';
import { AuthService } from '../../../../core/services/auth-service';
import { NavTickerScroll } from '../../../../shared/components/layout/nav/nav-ticker-scroll/nav-ticker-scroll';

@Component({
  selector: 'app-auth-page',
  imports: [LoginForm, RegisterForm, NavTickerScroll],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
  private authService = inject(AuthService);

  error = computed(() => this.authService.authError());

  isLoginForm = signal(true);

  toggleForm() {
    this.isLoginForm.update((value) => !value);
    this.authService.resetError();
  }

  login(loginForm: LoginData) {
    console.log(loginForm);
    this.authService.login(loginForm.email, loginForm.password);
  }

  register(registerForm: RegisterData) {
    console.log(registerForm);
    this.authService.register(registerForm.email, registerForm.password, registerForm.name);
  }
}
