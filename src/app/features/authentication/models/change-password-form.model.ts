import { required, schema, validate } from '@angular/forms/signals';

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
}

export const changePasswordInitialData: ChangePasswordData = {
  oldPassword: '',
  newPassword: '',
  retypePassword: '',
};

export const changePasswordSchema = schema<ChangePasswordData>((rootPath) => {
  required(rootPath.oldPassword, { message: 'Old password is required' });
  required(rootPath.newPassword, { message: 'New password is required' });
  required(rootPath.retypePassword, { message: 'Repeating new password is required' });
  validate(rootPath.retypePassword, (ctx) => {
    const password = ctx.valueOf(rootPath.newPassword);
    const confirmPassword = ctx.value();
    if (password === confirmPassword) return null;
    return {
      kind: 'passwordsDoNotMatch',
      message: 'Passwords do not match!',
    };
  });
});
