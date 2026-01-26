import { Injectable, signal, computed, inject } from '@angular/core';
import { account, ID } from '../../lib/appwrite';
import { Models } from 'appwrite';
import { VERIFY_URL } from '../tokens/verify-url.token';
import { Router } from '@angular/router';
import { AppwriteError } from '../../shared/models/appwrite.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<Models.User<Models.Preferences> | null>(null);
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly isUserVerified = computed(() => this.currentUser()?.emailVerification);
  readonly isEmailVerified = computed(() => this.currentUser()?.emailVerification ?? false);
  private readonly verifyUrl = inject(VERIFY_URL);
  authError = signal<string>('');
  private router = inject(Router);

  readonly isInitialized = signal(false);
  readonly sessionReady: Promise<void>;

  constructor() {
    this.sessionReady = this.restoreSession();
  }

  async login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession({
        email,
        password,
      });
      this.currentUser.set(await account.get());
      this.router.navigate(['/dashboard']);
      this.authError.set('');
    } catch (err: unknown) {
      const error = err as AppwriteError;
      if (error.message) {
        this.authError.set(error.message);
        console.log(this.authError());
      }
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      await this.login(email, password);
      await account.createEmailVerification({ url: this.verifyUrl });
      this.router.navigate(['/auth/verify']);
    } catch (err: unknown) {
      const error = err as AppwriteError;
      if (error.message) {
        this.authError.set(error.message);
        console.log(this.authError());
      }
    }
  }

  async resendVerification() {
    try {
      await account.createEmailVerification({
        url: this.verifyUrl,
      });
    } catch (err: unknown) {
      const error = err as AppwriteError;
      if (error.message) {
        this.authError.set(error.message);
        console.log(this.authError());
      }
    }
  }

  async verifyEmail(userId: string, secret: string) {
    try {
      await account.updateEmailVerification({
        userId,
        secret,
      });
      const user = await account.get();
      this.currentUser.set(user);
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const error = err as AppwriteError;
      if (error.message) {
        this.authError.set(error.message);
        console.log(this.authError());
      }
    }
  }

  async logout() {
    await account.deleteSession({
      sessionId: 'current',
    });
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  async restoreSession() {
    try {
      const user = await account.get();
      this.currentUser.set(user);
    } catch {
      this.currentUser.set(null);
    } finally {
      this.isInitialized.set(true);
    }
  }

  resetError() {
    this.authError.set('');
  }

  async changePassword(oldPassword: string, newPassword: string) {
    try {
      await account.updatePassword({ password: newPassword, oldPassword: oldPassword });
      await this.logout();
    } catch (err: unknown) {
      const error = err as AppwriteError;
      if (error.message) {
        this.authError.set(error.message);
      }
      throw error;
    }
  }
}
