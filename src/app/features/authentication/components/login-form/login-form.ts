import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LoginData, loginInitialData } from '../../models/auth-form.model';
import { Input } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-login-form',
  imports: [Input, FormField],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginModel = signal<LoginData>(loginInitialData);
  loginForm = form(this.loginModel);

  onSubmit() {
    console.log(this.loginForm().value());
  }
}
