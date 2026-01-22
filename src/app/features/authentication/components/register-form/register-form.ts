import { Component, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  RegisterData,
  registerDataSchema,
  registerInitialData,
} from '../../models/auth-form.model';
import { Input } from '../../../../shared/components/input/input';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-register-form',
  imports: [Input, FormField, Button],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  registerModel = signal<RegisterData>(registerInitialData);
  registerForm = form(this.registerModel, registerDataSchema);
  emitRegisterFormValues = output<RegisterData>();

  onSubmit() {
    this.emitRegisterFormValues.emit(this.registerForm().value());
  }
}
