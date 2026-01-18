export interface CryptoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: Roi | null;
  last_updated: string;
  price_change_percentage_1h_in_currency?: number;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export type CurrencyMap<T = number> = Record<string, T>;

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;

  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<string, PlatformDetails>;

  block_time_in_minutes: number | null;
  hashing_algorithm: string | null;

  categories: string[];
  preview_listing: boolean;

  public_notice: string | null;
  additional_notices: string[];

  localization: Record<string, string>;
  description: Record<string, string>;

  links: CoinLinks;
  image: CoinImage;

  country_origin: string;
  genesis_date: string | null;

  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;

  watchlist_portfolio_users: number;
  market_cap_rank: number;

  market_data: MarketData;
}

export interface PlatformDetails {
  decimal_place: number | null;
  contract_address: string;
}

export interface CoinLinks {
  homepage: string[];
  whitepaper: string | null;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  snapshot_url: string | null;

  twitter_screen_name: string | null;
  facebook_username: string | null;
  bitcointalk_thread_identifier: number | null;
  telegram_channel_identifier: string | null;
  subreddit_url: string | null;

  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

export interface CoinImage {
  thumb: string;
  small: string;
  large: string;
}

export interface MarketData {
  current_price: CurrencyMap;
  total_value_locked: number | null;

  market_cap: CurrencyMap;
  market_cap_rank: number;
  fully_diluted_valuation: CurrencyMap | null;
  market_cap_fdv_ratio: number | null;

  total_volume: CurrencyMap;

  high_24h: CurrencyMap;
  low_24h: CurrencyMap;

  price_change_24h: number;
  price_change_percentage_24h: number;

  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;

  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;

  ath: CurrencyMap;
  ath_change_percentage: CurrencyMap;
  ath_date: CurrencyMap<string>;

  atl: CurrencyMap;
  atl_change_percentage: CurrencyMap;
  atl_date: CurrencyMap<string>;

  price_change_24h_in_currency: CurrencyMap;
  price_change_percentage_1h_in_currency: CurrencyMap;
  price_change_percentage_24h_in_currency: CurrencyMap;
  price_change_percentage_7d_in_currency: CurrencyMap;
  price_change_percentage_14d_in_currency: CurrencyMap;
  price_change_percentage_30d_in_currency: CurrencyMap;
  price_change_percentage_60d_in_currency: CurrencyMap;
  price_change_percentage_200d_in_currency: CurrencyMap;
}
