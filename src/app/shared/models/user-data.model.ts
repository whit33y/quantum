export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $sequence: number;
  $tableId: string;
  $databaseId: string;
  $permissions: string[];
}

export interface userFavoriteDocument extends AppwriteDocument {
  userId: string;
  coinId: string;
}

export interface userFavorite {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  coinId: string;
}

export interface userFavoriteResponse {
  items: userFavorite[];
  total: number;
}

export interface userWalletDocument extends AppwriteDocument {
  userId: string;
  coinId: string;
  walletBalance: number;
}

export interface userWallet {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  coinId: string;
  walletBalance: number;
}

export interface userWalletResponse {
  items: userWallet[];
  total: number;
}
