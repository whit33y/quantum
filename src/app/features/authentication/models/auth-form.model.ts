import { email, minLength, required, schema, validate } from '@angular/forms/signals';

export interface LoginData {
  email: string;
  password: string;
}

export const loginInitialData: LoginData = {
  email: '',
  password: '',
};

export const loginDataSchema = schema<LoginData>((rootPath) => {
  required(rootPath.email, { message: 'Email is required' });
  email(rootPath.email, { message: 'Email must be valid ' });
  required(rootPath.password, { message: 'Password is required' });
});

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const registerInitialData: RegisterData = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

export const registerDataSchema = schema<RegisterData>((rootPath) => {
  required(rootPath.email, { message: 'Email is required' });
  required(rootPath.name, { message: 'Username is required' });
  minLength(rootPath.name, 4, { message: 'Username must be at least 4 characters long' });
  required(rootPath.password, { message: 'Password is required' });
  minLength(rootPath.password, 8, { message: 'Password must be at least 8 characters long' });
  required(rootPath.confirmPassword, { message: 'You have to confirm your password' });
  validate(rootPath.confirmPassword, (ctx) => {
    const password = ctx.valueOf(rootPath.password);
    const confirmPassword = ctx.value();
    if (password === confirmPassword) return null;
    return {
      kind: 'passwordsDoNotMatch',
      message: 'Passwords do not match!',
    };
  });
});
