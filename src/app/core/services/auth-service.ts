import { Injectable, signal, computed } from '@angular/core';
import { account, ID } from '../../lib/appwrite';
import { Models } from 'appwrite';
import { VERIFY_URL } from '../tokens/verify-url.token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<Models.User<Models.Preferences> | null>(null);
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly isEmailVerified = computed(() => this.currentUser()?.emailVerification ?? false);

  constructor() {
    this.restoreSession();
  }

  async login(email: string, password: string) {
    await account.createEmailPasswordSession({
      email,
      password,
    });
    this.currentUser.set(await account.get());
  }

  async register(email: string, password: string, name: string) {
    await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    await this.login(email, password);
    await account.createEmailVerification({ url: `${VERIFY_URL}` });
  }

  async resendVerification() {
    await account.createEmailVerification({
      url: `${VERIFY_URL}`,
    });
  }

  async verifyEmail(userId: string, secret: string) {
    await account.updateEmailVerification({
      userId,
      secret,
    });

    const user = await account.get();
    this.currentUser.set(user);
  }

  async logout() {
    await account.deleteSession({
      sessionId: 'current',
    });
    this.currentUser.set(null);
  }

  async restoreSession() {
    try {
      const user = await account.get();
      this.currentUser.set(user);
    } catch {
      this.currentUser.set(null);
    }
  }
}
