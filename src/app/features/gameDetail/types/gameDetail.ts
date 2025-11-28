export interface GameLayoutProps {
  data: {
    title: string
    coverImage: string
    genre: string
    platform: string
    releaseDate: string
    description: string
    rating?: number
  }
}

export interface GameDetail {
  gameId: number;
  title: string;
  description: string | null;
  coverImageUrl?: string | null;
  developers: string[];
  genres: string[];
  platforms: string[];
}