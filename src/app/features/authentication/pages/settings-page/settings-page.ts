import { Component, computed, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  ChangePasswordData,
  changePasswordInitialData,
  changePasswordSchema,
} from '../../models/change-password-form.model';
import { Input } from '../../../../shared/components/input/input';
import { Button } from '../../../../shared/components/button/button';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-settings-page',
  imports: [FormField, Input, Button],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage {
  private authService = inject(AuthService);

  error = computed(() => this.authService.authError());

  eff = effect(() => {
    console.log(this.authService.authError());
  });

  changePasswordModel = signal<ChangePasswordData>(changePasswordInitialData);
  changePasswordForm = form(this.changePasswordModel, changePasswordSchema);

  onSubmit() {
    if (this.changePasswordForm().valid()) {
      this.authService.changePassword(
        this.changePasswordModel().oldPassword,
        this.changePasswordModel().newPassword,
      );
    }
  }
}
