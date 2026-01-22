import { Component, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LoginData, loginDataSchema, loginInitialData } from '../../models/auth-form.model';
import { Input } from '../../../../shared/components/input/input';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-login-form',
  imports: [Input, FormField, Button],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginModel = signal<LoginData>(loginInitialData);
  loginForm = form(this.loginModel, loginDataSchema);
  emitLoginFormValues = output<LoginData>();

  onSubmit() {
    this.emitLoginFormValues.emit(this.loginForm().value());
  }
}
