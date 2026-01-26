import { Injectable } from '@angular/core';
import {
  UserFavoriteDocument,
  UserFavoriteResponse,
  UserWalletDocument,
  UserWalletResponse,
} from '../../shared/models/user-data.model';
import { tablesDb } from '../../lib/appwrite';
import { environment } from '../../../environments/environment';
import { ID, Permission, Query, Role } from 'appwrite';

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

  async addFavoriteCoin(userId: string, coinId: string) {
    const response = await tablesDb.createRow({
      databaseId: environment.appwriteDatabaseId,
      tableId: environment.appwriteUserFavorite,
      rowId: ID.unique(),
      data: {
        userId,
        coinId,
      },
      permissions: [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ],
    });
    return response;
  }

  async deleteFavoriteCoin(id: string) {
    const response = await tablesDb.deleteRow({
      databaseId: environment.appwriteDatabaseId,
      tableId: environment.appwriteUserFavorite,
      rowId: id,
    });
    return response;
  }

  async deleteWalletCoin(id: string) {
    const response = await tablesDb.deleteRow({
      databaseId: environment.appwriteDatabaseId,
      tableId: environment.appwriteUserWallet,
      rowId: id,
    });
    return response;
  }

  async getUserWallet(userId: string): Promise<UserWalletResponse> {
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

  async addCoinToWallet(userId: string, walletBalance: number, coinId: string) {
    const response = await tablesDb.createRow({
      databaseId: environment.appwriteDatabaseId,
      tableId: environment.appwriteUserWallet,
      rowId: ID.unique(),
      data: {
        userId,
        walletBalance,
        coinId,
      },
      permissions: [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ],
    });
    return response;
  }
}
