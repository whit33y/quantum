import { Component, output, signal } from '@angular/core';
import { Input } from '../../../../shared/components/input/input';
import { form, FormField } from '@angular/forms/signals';
import {
  ChangePasswordData,
  changePasswordInitialData,
  changePasswordSchema,
} from '../../models/change-password-form.model';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-change-password-form',
  imports: [Input, Button, FormField],
  templateUrl: './change-password-form.html',
  styleUrl: './change-password-form.css',
})
export class ChangePasswordForm {
  changePasswordModel = signal<ChangePasswordData>(changePasswordInitialData);
  changePasswordForm = form(this.changePasswordModel, changePasswordSchema);
  emitChangePassswordFormValues = output<ChangePasswordData>();

  onSubmit() {
    this.emitChangePassswordFormValues.emit(this.changePasswordForm().value());
  }
}
