import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { VERIFY_URL } from './core/tokens/verify-url.token';
import { AuthService } from './core/services/auth-service';

export function initAuth() {
  return () => inject(AuthService).restoreSession();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: VERIFY_URL,
      useValue: 'http://localhost:4200/auth/verify',
    },
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.restoreSession();
    }),
  ],
};
