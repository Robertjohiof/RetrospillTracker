export interface User {
  userId: number;
  userName: string;
  slug: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  profileBanner?: string;
  biography: string;
  isActive: boolean;
  roleId: number;
}

interface UserGame {
  gameId: number;
  title: string;
  platform?: string;
  score?: number;
  statusId?: number;
}

interface Collections {
  collectionId: number;
  name: string | null;
  isBacklog: boolean;
  isPublic: boolean;
}

export interface ProfileData {
  user: User;
  collections: Collections[];
  userGames: UserGame[];
}