export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $sequence: number;
  $tableId: string;
  $databaseId: string;
  $permissions: string[];
}

export interface UserFavoriteDocument extends AppwriteDocument {
  userId: string;
  coinId: string;
}

export interface UserFavorite {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  coinId: string;
}

export interface UserFavoriteResponse {
  items: UserFavorite[];
  total: number;
}

export interface UserWalletDocument extends AppwriteDocument {
  userId: string;
  coinId: string;
  walletBalance: number;
}

export interface UserWallet {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  coinId: string;
  walletBalance: number;
}

export interface userWalletResponse {
  items: UserWallet[];
  total: number;
}
