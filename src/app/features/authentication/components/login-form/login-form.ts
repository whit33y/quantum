import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { LoginData } from '../../models/auth-form.model';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });
  loginForm = form(this.loginModel);
}
