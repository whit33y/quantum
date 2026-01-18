import { Injectable } from '@angular/core';
import {
  UserFavoriteDocument,
  UserFavoriteResponse,
  UserWalletDocument,
  userWalletResponse,
} from '../../../shared/models/user-data.model';
import { tablesDb } from '../../../lib/appwrite';
import { environment } from '../../../../environments/environment';
import { Query } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  async getUserFavorite(userId: string): Promise<UserFavoriteResponse> {
    const response = await tablesDb.listRows<UserFavoriteDocument>({
      databaseId: environment.appwriteDatabaseId,
      tableId: environment.appwriteUserFavorite,
      queries: [Query.equal('userId', userId), Query.orderDesc('$createdAt')],
    });

    return {
      items: response.rows.map((row) => ({
        $id: row.$id,
        $createdAt: row.$createdAt,
        $updatedAt: row.$updatedAt,
        coinId: row.coinId,
      })),
      total: response.total,
    };
  }

  async getUserWallet(userId: string): Promise<userWalletResponse> {
    const response = await tablesDb.listRows<UserWalletDocument>({
      databaseId: environment.appwriteDatabaseId,
      tableId: environment.appwriteUserWallet,
      queries: [Query.equal('userId', userId), Query.orderDesc('$createdAt')],
    });

    return {
      items: response.rows.map((row) => ({
        $id: row.$id,
        $createdAt: row.$createdAt,
        $updatedAt: row.$updatedAt,
        coinId: row.coinId,
        walletBalance: row.walletBalance,
      })),
      total: response.total,
    };
  }
}
