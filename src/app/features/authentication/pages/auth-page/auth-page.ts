import { Component, signal } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { RegisterForm } from '../../components/register-form/register-form';
import { LoginData, RegisterData } from '../../models/auth-form.model';

@Component({
  selector: 'app-auth-page',
  imports: [LoginForm, RegisterForm],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
  isLoginForm = signal(true);

  toggleForm() {
    this.isLoginForm.update((value) => !value);
  }

  login(loginForm: LoginData) {
    console.log(loginForm);
  }

  register(registerForm: RegisterData) {
    console.log(registerForm);
  }
}
