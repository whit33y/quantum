import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { RegisterData } from '../../models/auth-form.model';

@Component({
  selector: 'app-register-form',
  imports: [],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  registerModel = signal<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  registerForm = form(this.registerModel);
}
