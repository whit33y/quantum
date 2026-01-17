import { email, required, schema } from '@angular/forms/signals';

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
  required(rootPath.email, { message: 'Email is required ' });
  required(rootPath.name, { message: 'Username is required ' });
  required(rootPath.password, { message: 'Password is required ' });
  required(rootPath.confirmPassword, { message: 'You have to confirm your password ' });
});
