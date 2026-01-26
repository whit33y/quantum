import { Component, computed, effect, inject, signal } from '@angular/core';
import { ChangePasswordData } from '../../models/change-password-form.model';
import { AuthService } from '../../../../core/services/auth-service';
import { ChangePasswordForm } from '../../components/change-password-form/change-password-form';

@Component({
  selector: 'app-settings-page',
  imports: [ChangePasswordForm],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage {
  private authService = inject(AuthService);

  error = computed(() => this.authService.authError());

  eff = effect(() => {
    console.log(this.authService.authError());
  });

  onSubmit(event: ChangePasswordData) {
    this.authService.changePassword(event.oldPassword, event.newPassword);
  }
}
