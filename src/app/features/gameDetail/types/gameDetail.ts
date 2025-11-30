export interface GameDetail {
  gameId: number;
  title: string;
  description: string | null;
  coverImageUrl?: string | null;
  developers: string[];
  genres: string[];
  platforms: string[];
  rating?: number;
}

export interface GameData {
  game: GameDetail;
  developers: string[];
  genres: string[];
  platforms: string[];
}

export interface GameLayoutProps {
  data: GameData | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}