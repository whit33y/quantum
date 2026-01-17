import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RegisterData, registerInitialData } from '../../models/auth-form.model';
import { Input } from '../../../../shared/components/input/input';

@Component({
  selector: 'app-register-form',
  imports: [Input, FormField],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  registerModel = signal<RegisterData>(registerInitialData);

  registerForm = form(this.registerModel);

  onSubmit() {
    console.log(this.registerForm().value());
  }
}
