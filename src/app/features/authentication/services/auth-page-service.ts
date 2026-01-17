import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthPageService {
  currentFormState = signal<'signup' | 'login'>('login');
}
